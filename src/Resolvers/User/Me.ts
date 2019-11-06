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
        if (!ctx.req.session!.userId) {
            throw new Error('Session is invalid');
        }
        return User.findOneOrFail(ctx.req.session!.userId);
    }
}

export default MeResolver;