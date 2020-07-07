import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {RoleEditInput} from "./Input/RoleEditInput";
import {Role} from "../../Entity/Role";

@Resolver()
class RoleEditResolver {

    @Authorized(['Admin', 'Approved'])
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