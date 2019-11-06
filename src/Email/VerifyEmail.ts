import {MailOptions} from "../SendMail";

export const VerifyEmail = (to: string, from: string, targetUrl: string):MailOptions => {
    return {
        to: to,
        from: from,
        html: `<a href="${targetUrl}">${targetUrl}</a>`,
        text: `${targetUrl}`,
        subject: `Confirm your user`
    }
};