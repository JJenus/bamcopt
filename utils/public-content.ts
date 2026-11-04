export const publicNavigation = [
	{ label: 'Banking', to: '/banking' },
	{ label: 'Transfers', to: '/transfers' },
	{ label: 'Security', to: '/security' },
	{ label: 'Guides', to: '/news' },
	{ label: 'About us', to: '/resources/about-us' },
];

export const frequentlyAskedQuestions = [
	{ category: 'Getting started', question: 'How do I create an account?', answer: 'Choose Create account and enter your contact details, address, and a password. Use an email address you can access. Follow the verification instructions sent to you and review your account information after signing in.' },
	{ category: 'Getting started', question: 'What information will I need?', answer: 'Registration asks for your name, email, phone number, address, city, and country. Additional checks may be required before certain account features are available. Contact support if you need help with eligibility.' },
	{ category: 'Funding & transfers', question: 'How do I add funds?', answer: 'Sign in and open Add funds to see the available funding instructions. Check the account details, currency, and any reference before making a payment. Your balance updates when the funding has been confirmed; initiating a payment alone does not confirm receipt.' },
	{ category: 'Funding & transfers', question: 'How long does a transfer take?', answer: 'Timing depends on the transfer destination, processing, and any required checks. Review the transaction status rather than assuming a payment has completed. Contact support with the transaction reference if you need an update.' },
	{ category: 'Funding & transfers', question: 'Where can I check a transaction?', answer: 'Your transaction history is available after signing in. If you have a transaction reference, use Track a transaction to view its public receipt and current status. Share references only with people who need to see the receipt.' },
	{ category: 'Funding & transfers', question: 'Are there account limits or charges?', answer: 'Account limits depend on your account level and settings. Review your account information and confirm applicable charges and terms with support before committing to a transaction. No public rate or fee estimate is a guarantee.' },
	{ category: 'Account access', question: 'Why am I asked for an email code?', answer: 'Sign-in includes a one-time email code after your password. Enter the latest code in the sign-in screen. Never share your password or sign-in code with another person, including someone claiming to be support.' },
	{ category: 'Account access', question: 'What if I forget my password?', answer: 'Choose Forgot password on the sign-in page and enter your account email. If an account matches, you will receive reset instructions. Check your spam folder and contact support if you still cannot regain access.' },
];

export const guides = [
	{
		slug: 'getting-started', category: 'Getting started', title: 'Your first steps with digital banking',
		summary: 'From creating an account to finding your way around your balance and activity.', readTime: '3 min read', icon: 'ki-bank',
		sections: [
			{ title: 'Start with details you can verify', text: 'Create your account using your own name and an email address you can access. Check your phone number and address before submitting. Keep your contact information up to date so that important account messages reach you.' },
			{ title: 'Get familiar before moving money', text: 'After signing in, review your account overview, account information, and transaction history. Check which currency and account limits apply. If anything looks unfamiliar, ask support before sending funds.' },
			{ title: 'Follow the current funding instructions', text: 'Open Add funds in your account and read the available instructions carefully. Verify the beneficiary details, currency, and reference. Keep your payment confirmation until the funding is reflected in your account.' },
			{ title: 'Keep a record of your activity', text: 'Review your transaction history regularly and save references for transfers you may need to discuss with support. Report activity you do not recognize promptly. Do not send passwords, sign-in codes, or full financial credentials in an email.' },
		],
	},
	{
		slug: 'understanding-transfers', category: 'Money movement', title: 'Know where your transfer stands',
		summary: 'A practical guide to checking recipient details, transaction references, and payment status.', readTime: '4 min read', icon: 'ki-send',
		sections: [
			{ title: 'Check the destination before confirming', text: 'Compare the recipient name, destination account, bank, and amount with the details the recipient provided. A small typo can cause delays or send money to the wrong destination. Ask the recipient to confirm any unexpected change in their payment instructions.' },
			{ title: 'A submitted transfer is not always completed', text: 'Transfers can move through awaiting or processing states before completion. Timing can vary because of account checks and the receiving institution. Use the current status shown in your account or on the receipt rather than treating submission as proof of delivery.' },
			{ title: 'Use your transaction reference', text: 'Keep the reference associated with your transfer. You can use it on the Track a transaction page to retrieve a public receipt. Treat the reference as private: a person who has it may be able to view the limited information on that receipt.' },
			{ title: 'Ask for help without sending twice', text: 'If a transfer is delayed or marked failed, contact support with the reference and a short description. Check the account balance and transaction history before retrying. Sending another payment while the first is still being reviewed can create an unintended duplicate.' },
		],
	},
	{
		slug: 'protecting-your-account', category: 'Safer banking', title: 'Small habits. Stronger account protection.',
		summary: 'Recognize suspicious messages and protect your password, email, and sign-in codes.', readTime: '3 min read', icon: 'ki-shield-tick',
		sections: [
			{ title: 'Use a password that belongs to one account', text: 'Choose a long, unique password and store it in a trusted password manager. Reusing an email or shopping password means a breach elsewhere could put your banking access at risk. Secure the email account that receives your one-time sign-in codes, too.' },
			{ title: 'Keep sign-in codes to yourself', text: 'Only enter a sign-in code into the sign-in page you opened yourself. Do not read it out over the phone or forward it in a message. A request for a password or sign-in code from someone claiming to help you is a warning sign.' },
			{ title: 'Pause when a message creates urgency', text: 'Unexpected messages about blocked accounts, prizes, or urgent payments can be attempts to steal information. Open the website directly instead of following an unfamiliar link. Use the contact details on the website to check whether a request is genuine.' },
			{ title: 'Act quickly on unfamiliar activity', text: 'Review your activity and contact support if you see a transaction or account change you do not recognize. Change your password if you think it has been exposed, and secure your email account. Keep relevant messages and transaction references for your report.' },
		],
	},
];
