import {Arg, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {RegisterInput} from "./Input/RegisterInput";
import {SendMail} from "../../SendMail";
import {VerifyEmail} from "../../Email/VerifyEmail";
import {CreateConfirmationUrl} from "../../CreateConfirmationUrl";

@Resolver()
class RegisterResolver {
    @Mutation(()=>User)
    async Register(
        @Arg('input') {
            firstName,
            lastName,
            email,
            password
        }: RegisterInput,

    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            {
                firstName,
                lastName,
                email,
                isActive: true,
                password: hashedPassword
            }

        );
        await user.save();

        await SendMail(VerifyEmail(
            email,
            'testmailer@test.com',
            CreateConfirmationUrl(user, 'user/confirm')
        ));

        return user;
    }
}

export default RegisterResolver;