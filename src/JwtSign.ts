import jwt from 'jsonwebtoken';
import {User} from "./Entity/User";

export const JwtSign = (user: User, type: string) => {
    return jwt.sign(
        {
            iat: new Date().valueOf() ,
            type,
            iss: "typegraphql-testing",
            ...user
        }, `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`, { algorithm: 'RS256'} )
}