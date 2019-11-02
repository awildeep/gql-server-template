import {MyContextType} from "./Types/MyContextType";
import {AuthChecker} from "type-graphql";
import {Role} from "./Entity/Role";

const CustomAuthChecker: AuthChecker<MyContextType> =
    async ({ context }, roles) => {
        const assignedRolesObjects = await context.connection.query(
            `SELECT 
            roles.name
            FROM roles 
            JOIN user_role ON (user_role.role_id = roles.role_id) 
            JOIN users  ON (users.user_id = user_role.user_id)
            WHERE users.user_id = $1 `,
            [context.user.userId]
        );

        console.log ('here');

        const assignedRoles = assignedRolesObjects.map((a: Role) => a.name);

        for(let i =0; i< roles.length; i++) {
            if (!assignedRoles.includes(roles[i])) {
                console.log('Access denied role not found:', roles[i]);
                return false;
            } else {
                console.log('Access granted for role:', roles[i]);
            }
        }

        return true;
    };

    export default CustomAuthChecker