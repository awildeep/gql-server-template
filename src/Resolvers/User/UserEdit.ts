import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {UserEditInput} from "./Input/UserEditInput";

@Resolver()
class UserEditResolver {
    @Authorized(['Admin', 'Approved'])
    @Mutation(()=>User)
    async UserEdit(
        @Arg('input') {
            userId,
            firstName,
            lastName,
            email,
            password,
            isActive
        }: UserEditInput,

    ): Promise<User> {
        const user = await User.findOneOrFail(userId);

        if (password) {
            user.password = await bcrypt.hash(password, 12);
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.isActive = isActive;

        await user.save();

        return user;
    }
}

export default UserEditResolver;