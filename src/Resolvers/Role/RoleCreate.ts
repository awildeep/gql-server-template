import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {RoleCreateInput} from "./RoleCreate/RoleCreateInput";
import {Role} from "../../Entity/Role";

@Resolver()
class RoleCreateResolver {

    @Authorized(['Admin'])
    @Mutation(()=>Role)
    async RoleCreate(
        @Arg('input') {
            name
        }: RoleCreateInput
    ): Promise<Role> {

        const role = await Role.create({
            name
        });
        await role.save();

        return role;
    }
}

export default RoleCreateResolver;