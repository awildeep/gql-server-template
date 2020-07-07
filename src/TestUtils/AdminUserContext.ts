import { User } from '../Entity/User';
import { Connection } from 'typeorm';

export const AdminUserContext = async (connection: Connection): Promise<{ user: any; connection: Connection }> => {
    const dbUser = await User.findOne({
        where: {
            email: 'awildeep+admin@gmail.com',
        },
    });
    return {
        user: dbUser,
        connection,
    };
};
