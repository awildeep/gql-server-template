import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../Entity/User';
import { RegisterInput } from './Input/RegisterInput';
import { SendMail } from '../../SendMail';
import { VerifyEmail } from '../../Email/VerifyEmail';
import { CreateConfirmationUrl } from '../../CreateConfirmationUrl';
import EnvironmentConfig from '../../EnvironmentConfig';
import { Organization } from '../../Entity/Organization';

@Resolver()
class RegisterResolver {
    @Mutation(() => User)
    async Register(
        @Arg('input') { firstName, lastName, email, password, organization }: RegisterInput,
    ): Promise<User | null> {
        let user = null;
        try {
            const foundOrg = await Organization.findOne({
                where: {
                    name: organization,
                    isActive: true,
                },
            }).catch(() => {
                throw Error('Organization not found');
            });

            const hashedPassword = await bcrypt.hash(password, 12);

            user = await User.create({
                firstName,
                lastName,
                email,
                isActive: true,
                password: hashedPassword,
                organization: foundOrg,
            });
            await user.save();

            await SendMail(
                VerifyEmail(
                    email,
                    EnvironmentConfig.OUTBOUND_MAIL_FROM_ADDRESS,
                    await CreateConfirmationUrl(user, 'user/confirm'),
                ),
            );
            return user;
        } catch (e) {
            console.log(e.message);
        }

        return user;
    }
}

export default RegisterResolver;
