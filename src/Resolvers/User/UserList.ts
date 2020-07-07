import {Arg, Authorized, Query, Resolver} from "type-graphql";
import {PaginationInput} from "../Validate/PaginationInput";
import {User} from "../../Entity/User";

@Resolver()
class UserListResolver {
    @Authorized(['User', 'Approved'])
    @Query(()=>[User], {nullable: true})
    async UserList(
        @Arg('input') {
            take,
            skip
        }: PaginationInput
    ): Promise<User[]> {
        return User.find({take, skip});
    }


}

export default UserListResolver;