import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../Entity/User';
import { ProfileEditInput } from './Input/ProfileEditInput';
import { MyContextType } from '../../Types/MyContextType';

@Resolver()
class ProfileEditResolver {
    @Authorized(['User', 'Approved'])
    @Mutation(() => User)
    async ProfileEdit(
        @Arg('input') { firstName, lastName, email, password }: ProfileEditInput,
        @Ctx() ctx: MyContextType,
    ): Promise<User> {
        const user = await User.findOneOrFail(ctx.user.userId);

        if (password) {
            user.password = await bcrypt.hash(password, 12);
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();

        return user;
    }
}

export default ProfileEditResolver;
