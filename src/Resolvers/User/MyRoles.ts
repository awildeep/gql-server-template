import {Authorized, Ctx, Query, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {MyContextType} from "../../Types/MyContextType";
import {UserRole} from "../../Entity/UserRole";

@Resolver()
class MyRolesResolver {
    @Authorized(['User'])
    @Query(()=>[UserRole], {nullable: true})
    async MyRoles(
        @Ctx() ctx: MyContextType
    ): Promise<UserRole[] | undefined> {
        if (!ctx.req.session!.userId) {
            throw new Error('Session is invalid');
        }
        const user = await User.findOneOrFail(ctx.req.session!.userId, {});

        return user.userRoles;
    }
}

export default MyRolesResolver;