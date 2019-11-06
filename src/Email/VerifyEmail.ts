import {MailOptions} from "../SendMail";

export const VerifyEmail = (to: string, from: string, confirmationUrl: string):MailOptions => {
    return {
        to: to,
        from: from,
        html: `<a href="${confirmationUrl}">${confirmationUrl}</a>`,
        text: `${confirmationUrl}`,
        subject: `Confirm your user`
    }
};