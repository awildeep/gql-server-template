import {Arg, Authorized, Query, Resolver} from "type-graphql";
import {UserRoleListInput} from "./Input/UserRoleListInput";
import {PaginationInput} from "../Validate/PaginationInput";
import {UserRole} from "../../Entity/UserRole";

@Resolver()
class UserRoleListResolver {
    @Authorized(['User'])
    @Query(()=>[UserRole], {nullable: true})
    async UserRoleList(
        @Arg('input') {
            userId
        }: UserRoleListInput,
        @Arg('pagination') {
            take,
            skip
        }: PaginationInput
    ): Promise<UserRole[]> {
        return UserRole.find(
            {
                where:{
                    user: userId
                },
            take,
            skip
        });
    }


}

export default UserRoleListResolver;