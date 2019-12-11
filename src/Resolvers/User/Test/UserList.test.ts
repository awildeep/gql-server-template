import {TestConn} from "../../../TestUtils/TestConn";
import {Connection} from "typeorm";
import {GraphqlCall} from "../../../TestUtils/GraphqlCall";
import {User} from "../../../Entity/User";

let conn: Connection;

beforeAll(async() => {
    conn = await TestConn();
});

afterAll(async() => {
    await conn.close();
});

const userListQuery = `
query UserList($input: PaginationInput!){
    UserList(input: $input) {
      userId
      
    }
}`;

describe("UserList", () => {
    it("should paginate a list of users", async() => {
        //Make the user
        const dbUser = await User.findOneOrFail({
            email: "awildeep+admin@gmail.com"
        });

        const res1 = await GraphqlCall({
            source: userListQuery,
            user: dbUser,
            variableValues: {
                input: {
                    take: 2,
                    skip: 0
                }
            },
            connection: conn
        });
        expect(res1).toBeDefined();
        expect(res1.data).toBeDefined();
        expect(res1!.data!.UserList).toBeDefined();
        expect(res1!.data!.UserList.length).toBe(2);

        const res2 = await GraphqlCall({
            source: userListQuery,
            user: dbUser,
            variableValues: {
                input: {
                    take: 2,
                    skip: 2
                }
            },
            connection: conn
        });


        expect(res2).toBeDefined();
        expect(res2.data).toBeDefined();
        expect(res2!.data!.UserList).toBeDefined();
        expect(res2!.data!.UserList.length).toBe(2);

        expect(res1!.data!.UserList[0].userId).not.toBe(res2!.data!.UserList[0].userId)
        expect(res1!.data!.UserList[1].userId).not.toBe(res2!.data!.UserList[1].userId)
    });

    it("should fetch a list of users", async() => {
        //Make the user
        const dbUser = await User.findOneOrFail({
            email: "awildeep+admin@gmail.com"
        });

        const res = await GraphqlCall({
            source: userListQuery,
            user: dbUser,
            variableValues: {
                input: {
                    take: 3,
                    skip: 0
                }
            },
            connection: conn
        });

        console.log(res.data);

        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res!.data!.UserList).toBeDefined();
        expect(res!.data!.UserList.length).toBe(3);
    });
});