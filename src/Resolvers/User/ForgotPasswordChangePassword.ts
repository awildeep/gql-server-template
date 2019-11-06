import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {ForgotPasswordChangePasswordInput} from "./Input/ForgotPasswordChangePasswordInput";
import {UserToken} from "../../Entity/UserToken";
import {LessThan} from "typeorm";
import {format} from "date-fns";
import bcrypt from "bcryptjs";

@Resolver()
class ForgotPasswordChangePasswordResolver {
    @Mutation(()=>User)
    async ForgotPasswordChangePassword(
        @Arg('input') {email, token, password}: ForgotPasswordChangePasswordInput
    ): Promise<User> {
        const confirmationLink = await UserToken.findOneOrFail({where: {token, expiry: (date: Date) => LessThan(format(date, 'YYYY-MM-DD HH:MM:SS'))}})
        const user = await User.findOneOrFail(confirmationLink.user.userId);
        if(user.email !== email || password) {
            throw(new Error('Invalid token, password or email address'));
        }

        user.password = await bcrypt.hash(password, 12);
        await user.save();
        await confirmationLink.remove();

        return user;
    }
}

export default ForgotPasswordChangePasswordResolver;