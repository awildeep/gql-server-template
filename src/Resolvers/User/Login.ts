import {Arg, Mutation, Resolver} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../Entity/User";
import {LoginInput} from "./Input/LoginInput";
import {Token} from "../../Entity/Token";
import GenerateTokens from "../../GenerateTokens";

@Resolver()
class LoginResolver {


    @Mutation(()=>Token)
    async Login(
        @Arg('input') {
            email,
            password
        }: LoginInput
    ): Promise<Token> {
        const errorMessage = `Invalid email or password`;

        const user = await User.findOneOrFail({where:{email, isActive: true}});

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw(new Error(errorMessage));
        }

        if (!user.confirmed) {
            throw(new Error(`User is not confirmed.  Please check your email. Or request a new link via ConfirmResend()`));
        }

        const token  = new Token();
        const {accessToken, refreshToken} = GenerateTokens(user);
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.user = user;

        return token;
    }
}

export default LoginResolver;