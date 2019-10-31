import {Arg, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {RegisterInput} from "./Register/RegisterInput";

@Resolver()
class RegisterResolver {
    @Mutation(()=>User)
    async register(
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

        return user;
    }
}

export default RegisterResolver;