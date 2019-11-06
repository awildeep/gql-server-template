import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {Token} from "../../Entity/Token";
import {ConfirmationLink} from "../../Entity/ConfirmationLink";
import {SendMail} from "../../SendMail";
import {VerifyEmail} from "../../Email/VerifyEmail";
import {CreateConfirmationUrl} from "../../CreateConfirmationUrl";

@Resolver()
class ConfirmResendResolver {


    @Mutation(()=>Token)
    async ConfirmResend(
        @Arg('input') email: string
    ): Promise<boolean> {

        const user = await User.findOneOrFail({where:{email}});

        if (user.confirmed) {
            throw('User already confirmed.');
        }

        await ConfirmationLink.delete({
            user
        });

        await SendMail(VerifyEmail(
            email,
            'testmailer@test.com',
            CreateConfirmationUrl(user)
        ));

        return true;
    }
}

export default ConfirmResendResolver;