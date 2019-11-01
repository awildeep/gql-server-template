import {Arg, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {LoginInput} from "./Login/LoginInput";
import {Token} from "../../Entity/Token";
import {JwtSign} from "../../JwtSign";

@Resolver()
class LoginResolver {

    @Mutation(()=>Token)
    async login(
        @Arg('input') {
            email,
            password
        }: LoginInput
    ): Promise<Token> {
        const errorMessage = `Invalid email or password`;

        const user = await User.findOne({where:{email}});
        if (!user) {
            throw(new Error(errorMessage));
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw(new Error(errorMessage));
        }

        const token  = new Token();
        token.accessToken = JwtSign(user, 'access');
        token.refreshToken = JwtSign(user, 'refresh');
        token.user = user;

        return token;
    }
}

export default LoginResolver;