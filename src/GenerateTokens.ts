import {JwtSign} from "./JwtSign";
import {User} from "./Entity/User";

const GenerateTokens = (user: User, ) => {
    return {
        accessToken: JwtSign(user, 'access', "8h"),
        refreshToken: JwtSign(user, 'refresh', "16h")
    }
};

export default GenerateTokens;