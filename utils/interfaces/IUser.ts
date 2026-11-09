import type { Account } from "./Account";
import { UserAccountStatus } from "./UserAccountStatus";
import type { UserCodePolicy } from "~/utils/app-defaults";

export interface IUser {
	id: string;
	name: string;
	email: string;
	phone: string;
	imgUrl: string;
	idUrl: string | null | undefined;
	address: string;
	city: string;
	country: string;
	dob: string | undefined;
	verified: boolean;
	emailVerified: boolean;
	status?: UserAccountStatus;
	userType: string;
	account: Account;
	createdAt: string;
	cot: any;
	imf: any;
	tax: any;
	/** admin view only: how this user is asked for the transfer codes, and when they last passed them (the remembered flag) */
	transferCodesPolicy?: UserCodePolicy;
	codesVerifiedAt?: string | null;
};

