import {Arg, Query, Resolver} from "type-graphql";
import {PaginationInput} from "../PaginationInput";
import {User} from "../../Entity/User";

@Resolver()
class UserListResolver {
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