import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {UserRoleCreateInput} from "./Input/UserRoleCreateInput";
import {UserRole} from "../../Entity/UserRole";
import {User} from "../../Entity/User";
import {Role} from "../../Entity/Role";

@Resolver()
class UserRoleCreateResolver {

    @Authorized(['Admin'])
    @Mutation(()=>UserRole)
    async RoleCreate(
        @Arg('input') {
            userId,
            roleId
        }: UserRoleCreateInput
    ): Promise<UserRole> {

        const userRole = await UserRole.create({
            user: await User.findOneOrFail(userId),
            role: await Role.findOneOrFail(roleId)
        });
        await userRole.save();

        return userRole;
    }
}

export default UserRoleCreateResolver;