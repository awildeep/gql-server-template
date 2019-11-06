import {v4} from 'uuid';
import { UserToken } from './Entity/UserToken';
import {User} from "./Entity/User";
import EnvironmentConfig from "./EnvironmentConfig";

export const CreateConfirmationUrl = (user: User, targetPath: string): string => {
    const now = new Date();

    const link = UserToken.create({
        user,
        token: v4(),
        expiry: now.setDate(now.getDate() + 14),
    });

    return `${EnvironmentConfig.CORS_DOMAIN}/${targetPath}/${link.token}`;
};