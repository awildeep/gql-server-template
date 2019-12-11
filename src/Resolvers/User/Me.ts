import {Authorized, Ctx, Query, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {MyContextType} from "../../Types/MyContextType";

@Resolver()
class MeResolver {
    @Authorized(['User'])
    @Query(()=>User, {nullable: true})
    async Me(
        @Ctx() ctx: MyContextType
    ): Promise<User> {


        return User.findOneOrFail(ctx.user!.userId);
    }
}

export default MeResolver;