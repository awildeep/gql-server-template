import { MailOptions } from '../SendMail';

export const ForgotPasswordEmail = (to: string, from: string, targetUrl: string): MailOptions => {
    return {
        to: to,
        from: from,
        html: `<a href="${targetUrl}">${targetUrl}</a>`,
        text: `${targetUrl}`,
        subject: `Change your password`,
    };
};
