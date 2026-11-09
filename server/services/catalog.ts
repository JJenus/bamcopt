/** App settings, currencies, account levels, beneficiaries, security logs: plain reads/writes. */
import { AccountLevel, AppSetting, Beneficiary, Currency, SecurityLog } from "../models";
import { notFound, unprocessable } from "../utils/errors";
import { CODE_POLICIES, CURRENCIES, LANGUAGES, currencySymbolFor } from "../../utils/app-defaults";

export const getAppSettings = async () =>
	(await AppSetting.findOne()) ?? AppSetting.create({ defaultBaseCurrency: "USD", defaultLanguage: "en", currencySymbol: "$" });

/**
 * The system defaults are chosen from fixed lists: the five most traded currencies and the supported languages.
 * An existing value that is no longer on a list is kept as it is (so saving something else never fails because of it).
 * The symbol always follows the currency.
 */
const normalizeAppSettings = (data: Record<string, unknown>, current?: AppSetting) => {
	const out: Record<string, unknown> = { ...data };
	const code = String(data.defaultBaseCurrency ?? "").trim().toUpperCase();
	if (!CURRENCIES.some((c) => c.code === code) && code !== current?.defaultBaseCurrency) throw unprocessable(`Choose one of: ${CURRENCIES.map((c) => c.code).join(", ")}`);
	out.defaultBaseCurrency = code;
	out.currencySymbol = currencySymbolFor(code) ?? current?.currencySymbol ?? String(data.currencySymbol ?? code);
	const language = String(data.defaultLanguage ?? "").trim().toLowerCase();
	if (!LANGUAGES.some((l) => l.code === language) && language !== current?.defaultLanguage) throw unprocessable(`Choose one of: ${LANGUAGES.map((l) => l.code).join(", ")}`);
	out.defaultLanguage = language;
	if (data.transferCodesPolicy === undefined) delete out.transferCodesPolicy;
	else {
		const policy = String(data.transferCodesPolicy).trim().toLowerCase();
		if (!(CODE_POLICIES as readonly string[]).includes(policy)) throw unprocessable("Transfer codes must be off, always or remember");
		out.transferCodesPolicy = policy;
	}
	return out;
};

export const createAppSettings = (data: Record<string, unknown>) => AppSetting.create(normalizeAppSettings(data));

export const updateAppSettings = async (id: string, data: Record<string, unknown>) => {
	const row = await AppSetting.findByPk(id);
	if (!row) throw notFound("Settings not found");
	return row.update(normalizeAppSettings(data, row));
};

type CrudModel = typeof Currency | typeof AccountLevel;
const crud = (model: CrudModel, label: string) => ({
	list: () => model.findAll(),
	get: async (id: string) => {
		const row = await model.findByPk(id);
		if (!row) throw notFound(`${label} not found`);
		return row;
	},
	create: (data: Record<string, unknown>) => model.create(data),
	update: async (id: string, data: Record<string, unknown>) => {
		const row = await model.findByPk(id);
		if (!row) throw notFound(`${label} not found`);
		return row.update(data);
	},
});
export const currencies = crud(Currency, "Currency");
export const accountLevels = crud(AccountLevel, "Account level");

export const listBeneficiaries = (userId: string) => Beneficiary.findAll({ where: { userId } });
export const createBeneficiary = (data: Record<string, unknown>) => Beneficiary.create(data);

export const listSecurityLogs = (userId: string) => SecurityLog.findAll({ where: { userId }, order: [["createdAt", "DESC"]] });
export const createSecurityLog = (data: Record<string, unknown>) => SecurityLog.create(data);
