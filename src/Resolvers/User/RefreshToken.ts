import {Authorized, Ctx, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {Token} from "../../Entity/Token";
import {JwtSign} from "../../JwtSign";
import {MyContextType} from "../../Types/MyContextType";
//  import EnvironmentConfig from "../../EnvironmentConfig";

@Resolver()
class RefreshTokenResolver {

    @Authorized(['User'])
    @Mutation(()=>Token)
    async refreshToken(
        @Ctx() ctx: MyContextType
    ): Promise<Token> {

        console.log('ctx.user.userId', ctx.user.userId);


        const errorMessage = `Invalid email or password`;

        const user = await User.findOne({where:{email: "bob+3@loblaw.com"}});
        if (!user) {
            throw(new Error(errorMessage));
        }


        const token  = new Token();
        token.accessToken = JwtSign(user, 'access');
        token.refreshToken = JwtSign(user, 'refresh');
        token.user = user;

        return token;
    }
}

export default RefreshTokenResolver;