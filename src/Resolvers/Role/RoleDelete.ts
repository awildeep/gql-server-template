import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {RoleDeleteInput} from "./Input/RoleDeleteInput";
import {Role} from "../../Entity/Role";

@Resolver()
class RoleDeleteResolver {

    @Authorized(['Admin'])
    @Mutation(()=>Role)
    async RoleDelete(
        @Arg('input') {
            roleId
        }: RoleDeleteInput
    ): Promise<Role> {
        const role = Role.findOneOrFail(roleId);
        await Role.delete(roleId);

        return role;
    }
}

export default RoleDeleteResolver;