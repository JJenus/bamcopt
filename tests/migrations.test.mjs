import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Sequelize, DataTypes } from 'sequelize';

const root = resolve(import.meta.dirname, '..');
const run = (storage, args = []) => spawnSync('pnpm', ['exec', 'sequelize-cli', ...args], {
	cwd: root, encoding: 'utf8', timeout: 30000,
	env: { ...process.env, NODE_ENV: 'test', DB_DIALECT: 'sqlite', DB_STORAGE: storage, DATABASE_URL: '', MIGRATION_ENV_FILE: '-' },
});
async function fixture(existing = false) {
	const dir = await mkdtemp('/tmp/opencode/bancopt-migrations-');
	const storage = resolve(dir, 'test.db');
	const db = new Sequelize({ dialect: 'sqlite', storage, logging: false });
	const qi = db.getQueryInterface();
	for (const name of ['users', 'funding_accounts', 'transactions']) await qi.createTable(name, { id: { type: DataTypes.UUID, primaryKey: true } });
	await qi.createTable('app_settings', { id: { type: DataTypes.UUID, primaryKey: true } });
	await db.query("INSERT INTO users (id) VALUES ('00000000-0000-4000-8000-000000000001')");
	await db.query("INSERT INTO app_settings (id) VALUES ('00000000-0000-4000-8000-000000000002')");
	await qi.createTable('notifications', { id: { type: DataTypes.UUID, primaryKey: true }, user_id: DataTypes.UUID, status: DataTypes.STRING, created_at: DataTypes.DATE });
	await qi.createTable('security_logs', { id: { type: DataTypes.UUID, primaryKey: true }, user_id: DataTypes.STRING, action: DataTypes.STRING, ip: DataTypes.STRING, device_info: DataTypes.STRING, reason: DataTypes.STRING, created_at: DataTypes.DATE, updated_at: DataTypes.DATE });
	if (existing) await qi.createTable('deposit_requests', {
		id: { type: DataTypes.UUID, primaryKey: true }, user_id: DataTypes.UUID, funding_account_id: DataTypes.UUID,
		request_key: DataTypes.UUID, amount: DataTypes.DECIMAL(20, 2), currency: DataTypes.STRING,
		funding_snapshot: DataTypes.JSON, reference: DataTypes.STRING, status: DataTypes.STRING,
		decision_note: DataTypes.TEXT, reviewed_by: DataTypes.UUID, reviewed_at: DataTypes.DATE,
		transaction_id: DataTypes.UUID, created_at: DataTypes.DATE, updated_at: DataTypes.DATE,
	});
	return { db, qi, dir, storage, cleanup: async () => { await db.close(); await rm(dir, { recursive: true, force: true }); } };
}

test('official CLI applies all pending migrations, tracks SequelizeMeta and safely reruns', async () => {
	const f = await fixture();
	try {
		const status = run(f.storage, ['db:migrate:status']); assert.equal(status.status, 0, status.stderr + status.stdout);
		assert.match(status.stdout, /down.*notification/); assert.match(status.stdout, /down.*deposit/); assert.match(status.stdout, /down.*security-log-location/); assert.match(status.stdout, /down.*audit-logs/); assert.match(status.stdout, /down.*user-sessions/); assert.match(status.stdout, /down.*transfer-code-policy/);
		const first = run(f.storage, ['db:migrate']); assert.equal(first.status, 0, first.stderr + first.stdout);
		assert.ok((await f.qi.describeTable('notifications')).entity_type);
		assert.ok((await f.qi.describeTable('deposit_requests')).transaction_id);
		assert.ok((await f.qi.describeTable('security_logs')).location);
		assert.ok((await f.qi.describeTable('audit_logs')).actor_id);
		assert.ok((await f.qi.describeTable('user_sessions')).revoked_at);
		assert.ok((await f.qi.describeTable('users')).codes_verified_at);
		const [[userRow]] = await f.db.query('SELECT transfer_codes_policy AS p FROM users'); assert.equal(userRow.p, 'default', 'existing users follow the system setting');
		const [[settingsRow]] = await f.db.query('SELECT transfer_codes_policy AS p FROM app_settings'); assert.equal(settingsRow.p, 'always', 'the system keeps asking on every transfer until an admin changes it');
		assert.ok((await f.qi.showIndex('security_logs')).some(i => i.name === 'security_logs_user_action_created_idx'));
		assert.ok((await f.qi.describeTable('referral_redemptions')).transaction_id);
		const [[program]] = await f.db.query("SELECT enabled,reward_points FROM referral_programs WHERE id='default'"); assert.equal(Number(program.enabled), 0); assert.equal(program.reward_points, 0);
		const [[minimums]] = await f.db.query("SELECT min_withdrawal_points,min_withdrawal_amount FROM referral_programs WHERE id='default'"); assert.equal(minimums.min_withdrawal_points, 1); assert.equal(Number(minimums.min_withdrawal_amount), 0.01);
		await assert.rejects(f.db.query("UPDATE referral_programs SET min_withdrawal_points=0 WHERE id='default'"));
		await assert.rejects(f.db.query("INSERT INTO referral_members (user_id,code,points,created_at,updated_at) VALUES ('00000000-0000-4000-8000-000000000001','0123456789ABCDEF',-1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)"));
		const [history] = await f.db.query('SELECT name FROM "SequelizeMeta"'); assert.equal(history.length, 8);
		const second = run(f.storage, ['db:migrate']); assert.equal(second.status, 0, second.stderr + second.stdout);
		const [same] = await f.db.query('SELECT name FROM "SequelizeMeta"'); assert.equal(same.length, 8);
	} finally { await f.cleanup(); }
});

test('existing sync-created request records survive; missing checks and uniqueness are enforced', async () => {
	const f = await fixture(true);
	const owner = randomUUID(), funding = randomUUID(), key = randomUUID(), id = randomUUID();
	const insert = (requestId, requestKey, amount, status) => f.db.query(`INSERT INTO deposit_requests (id,user_id,funding_account_id,request_key,amount,currency,funding_snapshot,reference,status,created_at,updated_at) VALUES (:id,:owner,:funding,:key,:amount,'USD','{}','',:status,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`, { replacements: { id: requestId, owner, funding, key: requestKey, amount, status } });
	try {
		await f.qi.bulkInsert('users', [{ id: owner }]); await f.qi.bulkInsert('funding_accounts', [{ id: funding }]);
		await insert(id, key, 12.29, 'pending');
		const migrated = run(f.storage, ['db:migrate']); assert.equal(migrated.status, 0, migrated.stderr + migrated.stdout);
		const [rows] = await f.db.query('SELECT * FROM deposit_requests'); assert.equal(rows.length, 1); assert.equal(rows[0].amount, 12.29);
		await assert.rejects(insert(randomUUID(), randomUUID(), 0, 'pending'));
		await assert.rejects(insert(randomUUID(), randomUUID(), 10, 'unknown'));
		await assert.rejects(insert(randomUUID(), key, 10, 'pending'));
	} finally { await f.cleanup(); }
});

test('failed transactional migration rolls back and prevents later migrations', async () => {
	const f = await fixture();
	try {
		await writeFile(resolve(f.dir, '20260101000000-fail.js'), `module.exports={up:async(q,S)=>q.sequelize.transaction(async t=>{await q.createTable('must_rollback',{id:{type:S.INTEGER}},{transaction:t});throw Error('Intentional migration test failure')}),down:async()=>{}};`);
		await writeFile(resolve(f.dir, '20260102000000-later.js'), `module.exports={up:async(q,S)=>q.createTable('must_not_run',{id:{type:S.INTEGER}}),down:async()=>{}};`);
		const result = run(f.storage, ['db:migrate', '--migrations-path', f.dir]); assert.notEqual(result.status, 0); assert.match(result.stderr + result.stdout, /Intentional migration test failure/);
		const tables = await f.qi.showAllTables(); assert.equal(tables.includes('must_rollback'), false); assert.equal(tables.includes('must_not_run'), false);
		const [rows] = await f.db.query('SELECT name FROM "SequelizeMeta"'); assert.equal(rows.length, 0);
	} finally { await f.cleanup(); }
});

test('production config refuses implicit/default database credentials', () => {
	const result = spawnSync(process.execPath, ['-e', "require('./db/config.cjs')"], { cwd: root, encoding: 'utf8', env: { ...process.env, MIGRATION_ENV_FILE: '-', NODE_ENV: 'production', DB_DIALECT: 'postgres', DATABASE_URL: '', DB_NAME: '', DB_USER: '' } });
	assert.notEqual(result.status, 0); assert.match(result.stderr, /DATABASE_URL|DB_NAME/);
});

test('invalid existing data blocks the financial migration without deleting records', async () => {
	const f = await fixture(true);
	try {
		await f.db.query("INSERT INTO deposit_requests (id,amount,status) VALUES ('invalid-fixture',0,'pending')");
		const result = run(f.storage, ['db:migrate']); assert.notEqual(result.status, 0);
		const [rows] = await f.db.query('SELECT id,amount FROM deposit_requests'); assert.equal(rows.length, 1); assert.equal(rows[0].amount, 0);
		const [history] = await f.db.query('SELECT name FROM "SequelizeMeta"'); assert.equal(history.length, 1); assert.match(history[0].name, /notification/);
	} finally { await f.cleanup(); }
});

test('explicit deployment variables win over an environment file', async () => {
	const dir = await mkdtemp('/tmp/opencode/bancopt-env-test-');
	try {
		const file = resolve(dir, '.env'); await writeFile(file, 'DB_NAME=file_database\nDB_USER=file_user\n');
		const result = spawnSync(process.execPath, ['-e', "process.stdout.write(JSON.stringify(require('./db/config.cjs').production))"], { cwd: root, encoding: 'utf8', env: { ...process.env, MIGRATION_ENV_FILE: file, NODE_ENV: 'production', DB_DIALECT: 'postgres', DATABASE_URL: '', DB_NAME: 'exported_database', DB_USER: 'exported_user' } });
		assert.equal(result.status, 0, result.stderr); const config = JSON.parse(result.stdout); assert.equal(config.database, 'exported_database'); assert.equal(config.username, 'exported_user');
	} finally { await rm(dir, { recursive: true, force: true }); }
});
