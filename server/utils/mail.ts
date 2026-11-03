import nodemailer, { Transporter } from "nodemailer";
import { env } from "./env";
import { welcomeEmail } from "../emails/welcome";
import { passwordEmail } from "../emails/password";
import { otpEmail } from "../emails/otp";

export const AppName = "Bancopt";

let transporter: Transporter | null = null;
const getTransporter = () => {
	if (!process.env.SMTP_PASS) return null; // mail disabled (dev / tests)
	transporter ??= nodemailer.createTransport({
		host: process.env.SMTP_HOST || "smtp.zoho.com",
		port: Number(process.env.SMTP_PORT || 465),
		secure: true,
		auth: { user: process.env.SMTP_USER || "noreply@bancopt.com", pass: process.env.SMTP_PASS },
	});
	return transporter;
};

/** Never throws: a mail failure must not fail the request that triggered it. */
const send = async (to: string, subject: string, html: string, text: string) => {
	const t = getTransporter();
	if (!t) return;
	try {
		await t.sendMail({
			from: `${AppName} <${process.env.SMTP_USER || "noreply@bancopt.com"}>`,
			to,
			subject,
			text,
			html,
		});
	} catch (error) {
		console.error("[mail] failed:", (error as Error).message);
	}
};

export const mailEnabled = () => !!process.env.SMTP_PASS;

type Recipient = { name?: string | null; email: string };

export const sendWelcomeEmail = (user: Recipient, token: string) =>
	send(
		user.email,
		`Welcome to ${AppName}`,
		welcomeEmail
			.replace("{{name}}", user.name || "")
			.replace("{{appUrl}}", env.appUrl)
			.replace("{{token}}", token),
		`Welcome to ${AppName}. Open ${env.appUrl}/verify-email?token=${token} to verify your email.`
	);

export const sendPasswordEmail = (user: Recipient, token: string) =>
	send(
		user.email,
		"Password Reset",
		passwordEmail.replace("{{appUrl}}", env.appUrl).replace("{{token}}", token),
		`Reset your password: ${env.appUrl}/new-password?token=${token}`
	);

export const sendOtpEmail = (user: Recipient, otp: string) =>
	send(
		user.email,
		"Login OTP",
		otpEmail.replace("{{ name }}", user.name || "").replace("{{ otp }}", String(otp)),
		`${AppName} OTP ${otp}. Expires in 15 minutes.`
	);
