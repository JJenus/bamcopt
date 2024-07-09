import { type IUser } from "./IUser";

export type OTP = {
	token: string;
	createdAt: string;
	allowedTime: number;
};

export type AuthToken = {
	userId: string;
	user?: any | IUser;
	token?: string;
	otp: OTP;
};
