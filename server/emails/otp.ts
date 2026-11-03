export const otpEmail = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Bancopt</title>
	</head>
	<body
		style="
			background-color: #d5d9e2;
			font-family: Arial, Helvetica, sans-serif;
			line-height: 1.5;
			min-height: 100%;
			font-weight: normal;
			font-size: 15px;
			color: #2f3044;
			margin: 0;
			padding: 15px;
			width: 100%;
		"
	>
		<div
			id="#kt_app_body_content"
			style="
				background-color: #d5d9e2;
				font-family: Arial, Helvetica, sans-serif;
				line-height: 1.5;
				min-height: 100%;
				font-weight: normal;
				font-size: 15px;
				color: #2f3044;
				margin: 0;
				padding: 0;
				width: 100%;
			"
		>
			<div
				style="
					background-color: #ffffff;
					padding: 45px 0 34px 0;
					border-radius: 24px;
					margin: 40px auto;
					max-width: 600px;
				"
			>
				<table
					align="center"
					border="0"
					cellpadding="0"
					cellspacing="0"
					width="100%"
					height="auto"
					style="border-collapse: collapse"
				>
					<tbody>
						<tr>
							<td
								align="center"
								valign="center"
								style="text-align: center; padding-bottom: 10px"
							>
								<!--begin:Email content-->
								<div
									style="
										text-align: center;
										margin: 0 15px 34px 15px;
									"
								>
									<!--begin:Logo-->
									<div style="margin-bottom: 10px">
										<a
											href="https://www.bancopt.com/"
											rel="noopener"
											target="_blank"
											style="
												text-decoration: none;
												position: relative;
												display: block;
												margin-bottom: 10px;
											"
										>
											<img
												alt="Logo"
												style="
													height: 50px;
													margin-top: 10px;
												"
												src="https://www.bancopt.com/assets/media/logos/logo-ban.png"
											/>
										</a>
										<div
											align="center"
											style="
												display: block;
												color: #1b668d;
												font-weight: bolder;
												font-size: 20px;
											"
										>
											Bancopt
										</div>
									</div>
									<!--end:Logo-->

									<!--begin:Media-->
									<div style="margin-bottom: 15px">
										<img
											width="150"
											alt="Logo"
											src="https://www.bancopt.com/assets/media/auth/coming-soon.png"
										/>
									</div>
									<!--end:Media-->

									<!--begin:Text-->
									<div
										style="
											font-size: 14px;
											font-weight: 500;
											margin-bottom: 27px;
											font-family: Arial, Helvetica,
												sans-serif;
										"
									>
										<p
											style="
												margin-bottom: 9px;
												color: #181c32;
												font-size: 22px;
												font-weight: 700;
											"
										>
											OTP
										</p>
										<p
											style="
												margin-bottom: 2px;
												color: #7e8299;
											"
										>
											Hello {{ name }}. Your one time
											password is
											<span style="font-weight: bold"
												>{{ otp }}</span
											>. Expires in 15 minutes.
											<br />
											<small style="font-weight: bold"
												>Do not share this with
												anyone!</small
											>
										</p>
									</div>
									<!--end:Text-->
								</div>
								<!--end:Email content-->
							</td>
						</tr>

						<tr>
							<td
								align="center"
								valign="center"
								style="
									font-size: 13px;
									text-align: center;
									padding: 0 10px 10px 10px;
									font-weight: 500;
									color: #a1a5b7;
									font-family: Arial, Helvetica, sans-serif;
								"
							>
								<p
									style="
										color: #181c32;
										font-size: 16px;
										font-weight: 600;
										margin-bottom: 9px;
									"
								>
									It’s all about you!
								</p>
								<p style="margin-bottom: 2px; display: none">
									Call our customer care number: +31 6 3344 55
									56
								</p>
								<p style="margin-bottom: 4px">
									You may reach us at
									<a
										href="https://www.bancopt.com/"
										rel="noopener"
										target="_blank"
										style="font-weight: 600"
										>bancopt.com</a
									>.
								</p>
								<p>We serve Mon-Sun, 09:00-18:00</p>
							</td>
						</tr>

						<tr>
							<td
								align="center"
								valign="center"
								style="text-align: center; padding-bottom: 20px"
							>
								<a href="#" style="margin-right: 10px"
									><img
										alt="Logo"
										src="https://www.bancopt.com/assets/media/email/icon-facebook.png"
								/></a>
								<a href="#"
									><img
										alt="Logo"
										src="https://www.bancopt.com/assets/media/email/icon-twitter.png"
								/></a>
							</td>
						</tr>

						<tr>
							<td
								align="center"
								valign="center"
								style="
									font-size: 13px;
									padding: 0 15px;
									text-align: center;
									font-weight: 500;
									color: #a1a5b7;
									font-family: Arial, Helvetica, sans-serif;
								"
							>
								<p>
									&copy Copyright Bancopt.
									<a
										href="https://www.bancopt.com/"
										rel="noopener"
										target="_blank"
										style="
											font-weight: 600;
											font-family: Arial, Helvetica,
												sans-serif;
										"
										>Unsubscribe</a
									>&nbsp; from newsletter.
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</body>
</html>
`