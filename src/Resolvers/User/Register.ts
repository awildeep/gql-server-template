import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../Entity/User';
import { RegisterInput } from './Input/RegisterInput';
import { SendMail } from '../../SendMail';
import { VerifyEmail } from '../../Email/VerifyEmail';
import { CreateConfirmationUrl } from '../../CreateConfirmationUrl';

@Resolver()
class RegisterResolver {
    @Mutation(() => User)
    async Register(@Arg('input') { firstName, lastName, email, password }: RegisterInput): Promise<User | null> {
        let user = null;
        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            user = await User.create({
                firstName,
                lastName,
                email,
                isActive: true,
                password: hashedPassword,
            });
            await user.save();

            await SendMail(
                VerifyEmail(email, 'testmailer@test.com', await CreateConfirmationUrl(user, 'user/confirm')),
            );
            return user;
        } catch (e) {
            console.log(e.message);
        }

        return user;
    }
}

export default RegisterResolver;
