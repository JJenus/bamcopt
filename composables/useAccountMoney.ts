export const useAccountMoney = () => {
	const { settings, formatMoney } = useAppSettings();
	const currencyCode = computed(() => settings.value.defaultBaseCurrency || '');
	const money = (amount: number | string = 0) => currencyCode.value ? formatMoney(amount, true) : '—';
	return { money, currencyCode };
};
