import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {RoleEditInput} from "./RoleEdit/RoleEditInput";
import {Role} from "../../Entity/Role";

@Resolver()
class RoleEditResolver {

    @Authorized(['Admin'])
    @Mutation(()=>Role)
    async RoleEdit(
        @Arg('input') {
            roleId,
            name
        }: RoleEditInput
    ): Promise<Role> {
        const role = await Role.findOneOrFail(roleId);
        role.name = name;
        await role.save();

        return role;
    }
}

export default RoleEditResolver;