import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../Entity/User';
import { Token } from '../../Entity/Token';
import { UserToken } from '../../Entity/UserToken';
import { SendMail } from '../../SendMail';
import { VerifyEmail } from '../../Email/VerifyEmail';
import { CreateConfirmationUrl } from '../../CreateConfirmationUrl';
import EnvironmentConfig from '../../EnvironmentConfig';

@Resolver()
class ConfirmResendResolver {
    @Mutation(() => Token)
    async ConfirmResend(@Arg('input') email: string): Promise<boolean> {
        const user = await User.findOneOrFail({ where: { email } });

        if (user.confirmed) {
            throw 'User already confirmed.';
        }

        await UserToken.delete({
            user,
        });

        await SendMail(
            VerifyEmail(
                email,
                EnvironmentConfig.OUTBOUND_MAIL_FROM_ADDRESS,
                await CreateConfirmationUrl(user, 'user/confirm'),
            ),
        );

        return true;
    }
}

export default ConfirmResendResolver;
