import {JwtSign} from "./JwtSign";
import {User} from "./Entity/User";

const GenerateTokens = (user: User, ) => {
    return {
        accessToken: JwtSign(user, 'access', "20m"),
        refreshToken: JwtSign(user, 'refresh', "10h")
    }
};

export default GenerateTokens;