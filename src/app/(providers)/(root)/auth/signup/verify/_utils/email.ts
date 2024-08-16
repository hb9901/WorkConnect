import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD
  }
});

export type ContactType = {
  otp: string;
  userEmail: string;
};

type MailOptionType = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export function sendEmail({ otp, userEmail }: ContactType) {
  const mailOptions: MailOptionType = {
    from: 'WorkConnect',
    to: userEmail || '',
    subject: '[Work Connect] 인증번호 발송',
    html: `
        <p>아래 인증번호를 입력하여 인증을 완료해주세요.</p>
    		<div>인증번호: <strong style="font-size: 16px; color: blue;">${otp}</strong></div>
    		`
  };

  return transporter.sendMail(mailOptions);
}
