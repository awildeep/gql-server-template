import { TestConn } from '../../../TestUtils/TestConn';
import { Connection } from 'typeorm';
import { GraphqlCall } from '../../../TestUtils/GraphqlCall';
import { AdminUserContext } from '../../../TestUtils/AdminUserContext';

let connection: Connection;

beforeAll(async () => {
    connection = await TestConn();
});

afterAll(async () => {
    await connection.close();
});

const meQuery = `
  query Me {
    Me {
      userId
      firstName
      lastName
      email
    }
  }
`;

describe('Me', () => {
    it('user can view self', async () => {
        const contextValue = await AdminUserContext(connection);

        const meRes = await GraphqlCall({
            source: meQuery,
            contextValue,
        });
        expect(meRes).toBeDefined();
        expect(meRes!.data).toBeDefined();
        expect(meRes!.data).toEqual(
            expect.objectContaining({
                Me: expect.objectContaining({
                    userId: contextValue.user?.userId.toString(),
                    firstName: contextValue.user?.firstName,
                    lastName: contextValue.user?.lastName,
                    email: contextValue.user?.email,
                }),
            }),
        );
    });
});
