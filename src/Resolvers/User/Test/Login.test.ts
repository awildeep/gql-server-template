import {TestConn} from "../../../TestUtils/TestConn";
import {Connection} from "typeorm";
import {GraphqlCall} from "../../../TestUtils/GraphqlCall";
import faker from "faker";
import {User} from "../../../Entity/User";
import bcrypt from "bcryptjs";

let conn: Connection;

beforeAll(async() => {
    conn = await TestConn();
});

afterAll(async() => {
    await conn.close();
});

const loginMutation = `
mutation ($input:LoginInput!){
  Login(input: $input) {
    accessToken
    refreshToken
    user {
      userId
      firstName
      lastName
      email
      userRoles {
        role {
          name
        }
      }
    }
  }
}`;


describe("Login", () => {
    it("Invalid credentials?  no access!", async() => {
        const invalidRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                input: {
                    email: faker.internet.email(),
                    password: faker.internet.password()
                }
            }
        });

        expect(invalidRes!.data).toBeNull();
        expect(invalidRes!.errors).toBeDefined();
        expect(invalidRes!.errors![0].message).toContain('Could not find any entity of type "User" matching:');
    });

    it("Inactive users can not login", async() => {
        //Test user data
        const firstName = faker.name.firstName();
        const lastName =  faker.name.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const isActive =  false;
        const confirmed =  true;

        //Make the user
        const dbUser = await User.create({
            firstName,
            lastName,
            email,
            isActive,
            confirmed,
            password:  await bcrypt.hash(password, 12),
        });
        await dbUser.save();

        //Attempt login
        const invalidRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                input: {
                    email,
                    password
                }
            }
        });
        expect(invalidRes!.data).toBeNull();
        expect(invalidRes!.errors).toBeDefined();
        expect(invalidRes!.errors![0].message).toContain('Could not find any entity of type "User" matching:');
    });

    it("Users can login", async() => {
        //Test user data
        const firstName = faker.name.firstName();
        const lastName =  faker.name.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const isActive =  true;
        const confirmed =  true;


        //Add user
        const dbUser = await User.create({
            firstName,
            lastName,
            email,
            isActive,
            confirmed,
            password:  await bcrypt.hash(password, 12),
        });
        await dbUser.save();
        expect(dbUser).toBeDefined();
        expect(dbUser!.email).toBe(email);
        expect(dbUser!.isActive).toBeTruthy();

        //Attempt login
        const confirmRes = await GraphqlCall({
            source: loginMutation,
            variableValues: {
                input: {
                    email,
                    password
                }
            }
        });
        expect(confirmRes).toBeDefined();
        expect(confirmRes!.data).toBeDefined();
        expect(confirmRes!.data!.Login).toBeDefined();
        expect(confirmRes!.data!.Login!.accessToken).toBeDefined();
        expect(confirmRes!.data!.Login!.refreshToken).toBeDefined();
        expect(confirmRes!.data!.Login!.user.userId).toBe(String(dbUser.userId));
        expect(confirmRes!.data!.Login!.user.email).toBe(email);
    });
});