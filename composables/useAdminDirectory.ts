import type { IUser } from '~/utils/interfaces/IUser';

export const useAdminDirectory = () => {
	const auth = useAuth();
	const users = useState<IUser[]>('admin-directory', () => []);
	const loading = useState('admin-directory-loading', () => false);
	const error = useState('admin-directory-error', () => '');
	const load = async () => {
		if (loading.value || import.meta.server) return;
		const token = auth.token.value;
		loading.value = true; error.value = '';
		try { const list = await userService.list(); if (auth.token.value === token) users.value = list; }
		catch { if (auth.token.value === token) error.value = 'Unable to load users. Please try again.'; }
		finally { if (auth.token.value === token) loading.value = false; }
	};
	return { users, loading, error, load };
};
