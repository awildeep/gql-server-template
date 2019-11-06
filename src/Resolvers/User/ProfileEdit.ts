import {Arg, Authorized, Ctx, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {ProfileEditInput} from "./ProfileEdit/ProfileEditInput";
import {MyContextType} from "../../Types/MyContextType";

@Resolver()
class ProfileEditResolver {
    @Authorized(['User'])
    @Mutation(()=>User)
    async ProfileEdit(
        @Arg('input') {
            firstName,
            lastName,
            email,
            password
        }: ProfileEditInput,
        @Ctx() ctx: MyContextType
    ): Promise<User> {
        const user = await User.findOneOrFail(ctx.req.session!.userId);

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