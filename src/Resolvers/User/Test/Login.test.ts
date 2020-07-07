import { TestConn } from '../../../TestUtils/TestConn';
import { Connection } from 'typeorm';
import { GraphqlCall } from '../../../TestUtils/GraphqlCall';
import { User } from '../../../Entity/User';

let conn: Connection;

beforeAll(async () => {
    conn = await TestConn();
});

afterAll(async () => {
    await conn.close();
});

const loginMutation = `
mutation Login($loginInput: LoginInput!) {
  Login(input: $loginInput) {
    user {
      userId
      firstName
      lastName
      email
      isActive
      userRoles {
        role {
          roleId
          name
        }
      }
    }
    accessToken
    refreshToken
  }
}`;

describe('Login', () => {
    it('invalid password fails to login', async () => {
        const loginRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                loginInput: {
                    email: 'awildeep+admin@gmail.com',
                    password: 'incorrect-password-value',
                },
            },
        });
        expect(loginRes!.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    message: expect.stringContaining('Invalid email or password'),
                }),
            ]),
        );
    });
    it('invalid username fails to login', async () => {
        const loginRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                loginInput: {
                    email: 'invalid.user@not.real.tld',
                    password: 'testing',
                },
            },
        });

        expect(loginRes!.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    message: expect.stringContaining('Invalid email or password'),
                }),
            ]),
        );
    });

    it('user can login', async () => {
        //Confirm the user exists post-registration
        const dbUser = await User.findOne({
            where: {
                isActive: true,
                confirmed: true,
            },
        });
        expect(dbUser).toBeDefined();
        expect(dbUser!.confirmed).toBeTruthy();
        expect(dbUser!.isActive).toBeTruthy();

        const loginRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                loginInput: {
                    email: dbUser!.email,
                    password: 'testing',
                },
            },
        });
        expect(loginRes).toBeDefined();
        expect(loginRes!.data).toBeDefined();
        expect(loginRes!.data).toEqual(
            expect.objectContaining({
                Login: expect.objectContaining({
                    accessToken: expect.anything(),
                    refreshToken: expect.anything(),
                }),
            }),
        );
    });
});
