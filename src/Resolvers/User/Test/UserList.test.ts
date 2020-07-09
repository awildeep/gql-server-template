import { TestConn } from '../../../TestUtils/TestConn';
import { Connection } from 'typeorm';
import { GraphqlCall } from '../../../TestUtils/GraphqlCall';
import { UserContext } from '../../../TestUtils/UserContext';

let connection: Connection;

beforeAll(async () => {
    connection = await TestConn();
});

afterAll(async () => {
    await connection.close();
});

const UserList = `
query UserList($input: UserListInput!) {
  UserList (input: $input){
    userId
    firstName
    lastName
    email
    isActive
    userRoles {
      userRoleId
      role {
        roleId
        name
      }
    }
    organization {
      organizationId
      name
    }
  }
}
`;

describe('UserList', () => {
    it('user can limit the list of users', async () => {
        const contextValue = await UserContext(connection);

        const userListRes = await GraphqlCall({
            source: UserList,
            contextValue,
            variableValues: {
                input: {
                    organizationId: 1,
                    limit: 2,
                    offset: 0,
                },
            },
        });
        expect(userListRes).toBeDefined();
        expect(userListRes!.data).toBeDefined();
        expect(userListRes!.data).toEqual(
            expect.objectContaining({
                UserList: expect.arrayContaining([
                    expect.objectContaining({ userId: expect.anything() }),
                    expect.objectContaining({ userId: expect.anything() }),
                ]),
            }),
        );
    });
    it('user can view list of users', async () => {
        const contextValue = await UserContext(connection);

        const userListRes = await GraphqlCall({
            source: UserList,
            contextValue,
            variableValues: {
                input: {
                    organizationId: 1,
                    limit: 1,
                    offset: 0,
                },
            },
        });
        expect(userListRes).toBeDefined();
        expect(userListRes!.data).toBeDefined();
        expect(userListRes!.data).toEqual(
            expect.objectContaining({
                UserList: expect.arrayContaining([expect.objectContaining({ userId: expect.anything() })]),
            }),
        );
    });
});
