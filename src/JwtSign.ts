import jwt from 'jsonwebtoken';
import {User} from "./Entity/User";
import EnvironmentConfig from "./EnvironmentConfig";

export interface Jwt {
    expiresIn: string,
    type: string,
    userId: number,
}

export const JwtSign = (user: User, type: string, exp: string) => {
    return jwt.sign(
        {
            type,
            ...user
        },
        EnvironmentConfig.JWT_SECRET,
        {
            algorithm: 'RS256',
            notBefore: 0,
            expiresIn: exp,
            issuer: EnvironmentConfig.JWT_ISSUER,
        }
    )
};
