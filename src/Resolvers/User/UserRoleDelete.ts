import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {UserRole} from "../../Entity/UserRole";
import {Role} from "../../Entity/Role";
import {UserRoleDeleteInput} from "./UserRole/UserRoleDeleteInput";

@Resolver()
class UserRoleDeleteResolver {

    @Authorized(['Admin'])
    @Mutation(()=>UserRole)
    async RoleCreate(
        @Arg('input') {
            userRoleId
        }: UserRoleDeleteInput
    ): Promise<UserRole> {

        const userRole = UserRole.findOneOrFail(userRoleId);
        await Role.delete(userRoleId);

        return userRole;
    }
}

export default UserRoleDeleteResolver;