import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {UserToken} from "../../Entity/UserToken";

@Resolver()
class ConfirmUserResolver {
    @Mutation(()=>Boolean)
    async ConfirmUser(
        @Arg('token') token: string
    ): Promise<Boolean> {
        const confirmationLink = await UserToken.findOneOrFail({where: {token}, relations: ["user"] });
        const user = await User.findOneOrFail(confirmationLink.user.userId);

        if (!user.confirmed) {
            user.confirmed = true;
            await user.save();
            await confirmationLink.remove();
            return true;
        }
        return false;
    }
}

export default ConfirmUserResolver;