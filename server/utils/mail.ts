import nodemailer, { type Transporter } from "nodemailer";
import { env } from "./env";
import { welcomeEmail } from "../emails/welcome";
import { passwordEmail } from "../emails/password";
import { otpEmail } from "../emails/otp";
import { renderEmailTemplate } from '../../utils/environment-urls';

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

const mailOrigin = () => {
	if (!mailEnabled()) return null;
	try { return env.appUrl; }
	catch { console.error('[mail] missing/invalid application origin; configure APP_URL for this environment'); return null; }
};

export const sendWelcomeEmail = (user: Recipient, token: string) => {
	const origin = mailOrigin(); if (!origin) return;
	return send(user.email, `Welcome to ${AppName}`,
		renderEmailTemplate(welcomeEmail, origin, { name: user.name || '', token }),
		`Welcome to ${AppName}. Open ${origin}/verify-email?token=${token} to verify your email.`);
};

export const sendPasswordEmail = (user: Recipient, token: string) => {
	const origin = mailOrigin(); if (!origin) return;
	return send(user.email, 'Password Reset', renderEmailTemplate(passwordEmail, origin, { name: user.name || '', token }),
		`Reset your password: ${origin}/new-password?token=${token}`);
};

export const sendOtpEmail = (user: Recipient, otp: string) => {
	const origin = mailOrigin(); if (!origin) return;
	return send(user.email, 'Login OTP', renderEmailTemplate(otpEmail, origin, { name: user.name || '', otp: String(otp) }),
		`${AppName} OTP ${otp}. Expires in 15 minutes.`);
};

const esc = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const sendNewDeviceEmail = (user: Recipient, details: { device: string; ip: string }) => {
	const origin = mailOrigin(); if (!origin) return;
	return send(
		user.email,
		`New sign-in to your ${AppName} account`,
		`<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2f3044;max-width:560px;margin:0 auto;padding:24px">
<p style="font-size:20px;font-weight:700;color:#181c32">New sign-in to your account</p>
<p>Hello ${esc(user.name || "")}, your ${AppName} account was just signed in to from a device we have not seen before.</p>
<p style="background:#f5f8fa;border-radius:8px;padding:12px 16px"><strong>${esc(details.device)}</strong><br />IP address ${esc(details.ip)}</p>
<p>If this was you, there is nothing to do. If it was not, open <a href="${esc(origin)}">${esc(origin)}</a>, go to Settings, Security, sign that device out and reset your password.</p></div>`,
		`New sign-in to your ${AppName} account from ${details.device} (IP ${details.ip}). If this was not you, open ${origin}, sign that device out under Settings > Security and reset your password.`
	);
};
