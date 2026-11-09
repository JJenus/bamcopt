export type AppSettings = {
	id: number;
	defaultLanguage: string;
	defaultBaseCurrency: string;
	currencySymbol: string;
	/** how transfers are asked for their codes by default: off, always or remember */
	transferCodesPolicy?: "off" | "always" | "remember";
	createdAt: string;
	updatedAt: string;
};
