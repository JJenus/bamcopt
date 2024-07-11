import { type Account  } from "./Account";
import { UserAccountStatus } from "./UserAccountStatus";

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
};

