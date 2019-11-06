import {v4} from 'uuid';
import { ConfirmationLink } from './Entity/ConfirmationLink';
import {User} from "./Entity/User";
import EnvironmentConfig from "./EnvironmentConfig";

export const CreateConfirmationUrl = (user: User): string => {
    const now = new Date();

    const link = ConfirmationLink.create({
        user,
        token: v4(),
        expiry: now.setDate(now.getDate() + 14),
    });

    return `${EnvironmentConfig.CORS_DOMAIN}/user/confirm/${link.token}`;
}