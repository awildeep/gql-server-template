import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {SendMail} from "../../SendMail";
import {CreateConfirmationUrl} from "../../CreateConfirmationUrl";
import {ForgotPasswordEmail} from "../../Email/ForgotPasswordEmail";

@Resolver()
class ForgotPasswordResolver {
    @Mutation(()=>Boolean)
    async ForgotPassword(
        @Arg('email') email: string
    ): Promise<Boolean> {

        const user = await User.findOneOrFail({where: {email}});

        await SendMail(ForgotPasswordEmail(
            email,
            'testmailer@test.com',
            CreateConfirmationUrl(user, 'user/forgot-password')
        ));

        return true;
    }
}

export default ForgotPasswordResolver;