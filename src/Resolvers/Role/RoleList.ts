import {Arg, Authorized, Query, Resolver} from "type-graphql";
import {Role} from "../../Entity/Role";
import {PaginationInput} from "../Validate/PaginationInput";

@Resolver()
class RoleListResolver {
    @Authorized(['User', 'Approved'])
    @Query(()=>[Role], {nullable: true})
    async RoleList(
        @Arg('input') {
            take,
            skip
        }: PaginationInput
    ): Promise<Role[]> {
        return Role.find({take, skip});
    }
}

export default RoleListResolver;