export const avatarInitials = (name = '', email = '') => {
	const words = (name.trim() || email.split('@')[0].replace(/[._+-]+/g, ' ')).split(/\s+/).filter(Boolean);
	return words.length ? (Array.from(words[0])[0] + (words.length > 1 ? Array.from(words.at(-1)!)[0] : '')).toLocaleUpperCase() : '?';
};
export const isPlaceholderPhoto = (src = '', configured = '') => !src || src === configured || /\/avatars\/(blank\.svg|default[^/]*)($|[?#])/i.test(src);
type DirectoryUser = { id: string; name?: string; email?: string; phone?: string; userType?: string; status?: string; account?: { accountNumber?: number | string } | null };
export const filterAdminUsers = <T extends DirectoryUser>(users: T[], query = '', status = '', role = '') => {
	const needle = query.trim().toLowerCase();
	return users.filter(user => (!status || user.status === status) && (!role || user.userType === role) && [user.id, user.name, user.email, user.phone, user.account?.accountNumber].some(value => String(value ?? '').toLowerCase().includes(needle)));
};
export const fundingTotals = (accounts: { active?: boolean; currency?: string | null; balance?: number | string }[]): [string, number][] => {
	const totals = new Map<string, number>();
	for (const account of accounts.filter(item => item.active)) {
		const code = account.currency?.trim().toUpperCase() || 'Unspecified';
		totals.set(code, (totals.get(code) || 0) + Number(account.balance || 0));
	}
	return [...totals];
};
export const transactionStatuses = (tx: { status?: string | null; type: string }) => tx.status === 'failed' ? ['failed'] : ['send', 'credit'].includes(tx.type) ? ['awaiting', 'processing', 'completed'] : ['awaiting', 'processing', 'completed', 'failed'];
export const adminMoney = (amount: unknown, code = '') => `${Number(amount || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${code ? ` ${/^[A-Z]{3,10}$/i.test(code) ? code.toUpperCase() : 'account units'}` : ''}`;
