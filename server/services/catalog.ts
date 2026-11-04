/** App settings, currencies, account levels, beneficiaries, security logs: plain reads/writes. */
import { AccountLevel, AppSetting, Beneficiary, Currency, SecurityLog } from "../models";
import { notFound } from "../utils/errors";

export const getAppSettings = async () =>
	(await AppSetting.findOne()) ?? AppSetting.create({ defaultBaseCurrency: "USD", defaultLanguage: "en", currencySymbol: "$" });

export const createAppSettings = (data: Record<string, unknown>) => AppSetting.create(data);

export const updateAppSettings = async (id: string, data: Record<string, unknown>) => {
	const row = await AppSetting.findByPk(id);
	if (!row) throw notFound("Settings not found");
	return row.update(data);
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
