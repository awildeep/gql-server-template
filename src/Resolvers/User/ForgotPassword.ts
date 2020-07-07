import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../Entity/User';
import { SendMail } from '../../SendMail';
import { CreateConfirmationUrl } from '../../CreateConfirmationUrl';
import { ForgotPasswordEmail } from '../../Email/ForgotPasswordEmail';

@Resolver()
class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async ForgotPassword(@Arg('email') email: string): Promise<boolean> {
        const user = await User.findOneOrFail({ where: { email } });

        await SendMail(
            ForgotPasswordEmail(
                email,
                'testmailer@test.com',
                await CreateConfirmationUrl(user, 'user/forgot-password'),
            ),
        );

        return true;
    }
}

export default ForgotPasswordResolver;
