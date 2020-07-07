import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../Entity/User';
import { Token } from '../../Entity/Token';
import jwt from 'jsonwebtoken';
import GenerateTokens from '../../GenerateTokens';
import { RefreshTokenInput } from './Input/RefreshTokenInput';
import EnvironmentConfig from '../../EnvironmentConfig';
import { Jwt } from '../../JwtSign';

@Resolver()
class RefreshTokenResolver {
    errMsg = `Invalid refresh token`;
    async checkJwtPayload(decoded: Jwt): Promise<void> {
        if (decoded.type !== 'refresh') {
            throw new Error(this.errMsg);
        }
    }
    async findUser(userId: number): Promise<User> {
        return await User.findOneOrFail(userId);
    }

    @Mutation((returns) => Token)
    async RefreshToken(@Arg('refreshToken') refreshTokenInput: RefreshTokenInput): Promise<Token> {
        try {
            const decoded = jwt.verify(refreshTokenInput.token, EnvironmentConfig.JWT_SECRET, {
                issuer: EnvironmentConfig.JWT_ISSUER,
                algorithms: ['RS256'],
            });
            await this.checkJwtPayload(<Jwt>decoded);

            const user = await this.findUser((<Jwt>decoded).userId);

            const newToken = new Token();
            const { accessToken, refreshToken } = GenerateTokens(user);
            newToken.accessToken = accessToken;
            newToken.refreshToken = refreshToken;
            newToken.user = user;

            return newToken;
        } catch (err) {
            throw new Error(this.errMsg);
        }
    }
}

export default RefreshTokenResolver;
