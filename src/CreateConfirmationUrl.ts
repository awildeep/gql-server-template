import {v4} from 'uuid';
import { UserToken } from './Entity/UserToken';
import {User} from "./Entity/User";
import EnvironmentConfig from "./EnvironmentConfig";
import { format } from 'date-fns'

export const CreateConfirmationToken = async (user: User): Promise<UserToken> => {
    const now = new Date();
    const link = await UserToken.create({
        user,
        token: v4(),
        expiry: format(now.setDate(now.getDate() + 14),'MM/dd/yyyy hh:mm:ss')
    });
    await link.save();
    return link;
};


export const CreateConfirmationUrl =  async(user: User, targetPath: string): Promise<string> => {
    const link = await CreateConfirmationToken(user);

    (EnvironmentConfig.NODE_ENV !== 'production') &&  console.log(`Confirmation token: <${link.token}>`);
    return `${EnvironmentConfig.CORS_DOMAIN}/${targetPath}/${link.token}`;
};