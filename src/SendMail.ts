import nodemailer from 'nodemailer';
import EnvironmentConfig from './EnvironmentConfig';

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export async function SendMail(mailOptions: MailOptions): Promise<void> {
    let smtpUsername = EnvironmentConfig.SMTP_USERNAME;
    let smtpPassword = EnvironmentConfig.SMTP_PASSWORD;

    if (EnvironmentConfig.SMTP_TEST_MODE || EnvironmentConfig.NODE_ENV === 'test') {
        const testAccount = await nodemailer.createTestAccount();
        smtpUsername = testAccount.user;
        smtpPassword = testAccount.pass;
    }

    const transporter = nodemailer.createTransport({
        host: EnvironmentConfig.SMTP_HOST,
        port: EnvironmentConfig.SMTP_PORT,
        secure: EnvironmentConfig.SMTP_IS_SECURE,
        auth: {
            user: smtpUsername,
            pass: smtpPassword,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
