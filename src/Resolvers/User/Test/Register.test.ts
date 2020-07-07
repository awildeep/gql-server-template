import { TestConn } from '../../../TestUtils/TestConn';
import { Connection } from 'typeorm';
import { GraphqlCall } from '../../../TestUtils/GraphqlCall';
import faker from 'faker';
import { User } from '../../../Entity/User';
import { UserToken } from '../../../Entity/UserToken';

let conn: Connection;

beforeAll(async () => {
    conn = await TestConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutation = `
mutation($input: RegisterInput!) {
  Register (input:$input) {
    userId
    firstName
    lastName
    email
  }
}`;

const confirmMutation = `
mutation ConfirmUser($token:String!){
  ConfirmUser(token: $token)
}`;

describe('Register', () => {
    it('register user and confirm', async () => {
        //Test user data
        const newUser = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        //Register the user via GQL
        const res = await GraphqlCall({
            source: registerMutation,
            variableValues: {
                input: newUser,
            },
        });
        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        //@ts-lint
        expect(res!.data!.Register).toBeDefined();
        expect(res!.data!.Register.firstName).toBe(newUser.firstName);
        expect(res!.data!.Register.lastName).toBe(newUser.lastName);
        expect(res!.data!.Register.email).toBe(newUser.email);

        //Confirm the user exists post-registration
        const dbUser = await User.findOne({
            where: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
        expect(dbUser).toBeDefined();
        expect(dbUser!.email).toBe(newUser.email);
        expect(dbUser!.confirmed).toBeFalsy();
        expect(dbUser!.isActive).toBeTruthy();

        //Find the confirm token in the DB
        const userToken = await UserToken.findOne({ where: { user: res.data!.Register.userId } });
        expect(userToken).toBeDefined();
        expect(userToken!.token).toBeDefined();

        //Confirm the user via GQL with the DB token
        const confirmRes = await GraphqlCall({
            source: confirmMutation,
            variableValues: {
                token: userToken!.token,
            },
        });
        expect(confirmRes).toBeDefined();
        expect(confirmRes!.data).toBeDefined();
        expect(confirmRes!.data!.ConfirmUser).toBeTruthy();

        //Verify the DB no longer has the token
        const checkUserToken = await UserToken.findOne({ where: { token: userToken!.token } });
        expect(checkUserToken).toBeUndefined();
    });
});
