import {Ctx, Query, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {MyContextType} from "../../Types/MyContextType";

@Resolver()
class MeResolver {
    @Query(()=>User, {nullable: true})
    async me(
        @Ctx() ctx: MyContextType
    ): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            throw new Error('Session is invalid');
        }
        return User.findOne(ctx.req.session!.userId);
    }


}

export default MeResolver;