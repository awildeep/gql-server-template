import { Query, Resolver} from "type-graphql";
import {Role} from "../../Entity/Role";

@Resolver()
class RoleListResolver {
    @Query(()=>[Role], {nullable: true})
    async RoleList(
    ): Promise<Role[]> {

        return Role.find();
    }


}

export default RoleListResolver;