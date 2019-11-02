import jwt from 'jsonwebtoken';
import {User} from "./Entity/User";
import EnvironmentConfig from "./EnvironmentConfig";

export interface Jwt {
    iat: number,
    expiresIn: string,
    type: string,
    iss: string,
    userId: number,
}


export const JwtSign = (user: User, type: string, exp: string) => {
    return jwt.sign(
        {
            iat: new Date().valueOf() ,
            expiresIn: exp,
            type,
            iss: EnvironmentConfig.JWT_ISSUER,
            ...user
        } as Jwt,
        EnvironmentConfig.JWT_SECRET,
        { algorithm: 'RS256'}
    )
};
