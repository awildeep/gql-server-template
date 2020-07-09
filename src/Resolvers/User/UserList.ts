import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { User } from '../../Entity/User';
import { UserListInput } from './Input/UserListInput';

@Resolver()
class UserListResolver {
    @Authorized(['User', 'Approved'])
    @Query(() => [User], { nullable: true })
    async UserList(
        @Arg('input') { firstName, lastName, isActive, confirmed, organizationId, limit, offset }: UserListInput,
    ): Promise<User[]> {
        const where: { [key: string]: any } = {
            organization: organizationId,
        };
        if (firstName) {
            where['firstName'] = firstName;
        }
        if (lastName) {
            where['lastName'] = lastName;
        }
        if (isActive) {
            where['isActive'] = isActive;
        }
        if (confirmed) {
            where['confirmed'] = confirmed;
        }

        return await User.find({
            where,
            take: limit,
            skip: offset,
            join: {
                alias: 'user',
                leftJoinAndSelect: {
                    organization: 'user.organization',
                },
            },
        }).catch((err) => {
            throw Error('No records found.' + err.message);
        });
    }
}

export default UserListResolver;
