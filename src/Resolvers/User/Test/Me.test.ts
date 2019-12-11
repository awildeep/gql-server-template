import {TestConn} from "../../../TestUtils/TestConn";
import {Connection} from "typeorm";
import {GraphqlCall} from "../../../TestUtils/GraphqlCall";
import faker from "faker";
import {User} from "../../../Entity/User";
import bcrypt from "bcryptjs";
import {UserRole} from "../../../Entity/UserRole";
import {Role} from "../../../Entity/Role";

let conn: Connection;

beforeAll(async() => {
    conn = await TestConn();
});

afterAll(async() => {
    await conn.close();
});

const meQuery = `
query {
  Me{
    userId
    firstName
    lastName
    isActive
    email
  }
}`;

describe("Me", () => {
    it("should fail to display my user information if I do not have the user role", async() => {
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
        //Find the user role

        //Register the user via GQL
        const res = await GraphqlCall({
            source: meQuery,
            user: dbUser,
            connection: conn
        });

        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res!.data!.Me).toBeNull();
        expect(res!.errors![0].message).toBe("Access denied! You don't have permission for this action!");
    });
    it("Fetch my user information", async() => {
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
        //Find the user role
        const dbRole = await Role.findOneOrFail({where: {name: 'User'}});
        //Connect the user to the User role
        const dbUserRole = await UserRole.create({
            user: dbUser,
            role: dbRole
        });
        await dbUserRole.save();
        //Register the user via GQL
        const res = await GraphqlCall({
            source: meQuery,
            user: dbUser,
            connection: conn
        });

        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res!.data!.Me).toBeDefined();
        expect(res!.data!.Me.firstName).toBe(firstName);
        expect(res!.data!.Me.lastName).toBe(lastName);
        expect(res!.data!.Me.email).toBe(email);
    });
});