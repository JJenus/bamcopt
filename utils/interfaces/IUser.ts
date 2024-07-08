import { Account } from "./Account";

export enum AccountStatus {
	HOLD = "HOLD",
	ACTIVE = "ACTIVE",
	SUSPENDED = "SUSPENDED",
}

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
	status?: AccountStatus;
	userType: string;
	account: Account;
	createdAt: string;
	cot: any;
	imf: any;
	tax: any;
}
