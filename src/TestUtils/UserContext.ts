import { User } from '../Entity/User';
import { Connection } from 'typeorm';

export const UserContext = async (connection: Connection): Promise<{ user: any; connection: Connection }> => {
    const dbUser = await User.findOne({
        where: {
            email: 'awildeep+approved@gmail.com',
        },
    });
    return {
        user: dbUser,
        connection,
    };
};
