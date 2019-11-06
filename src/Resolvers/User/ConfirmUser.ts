import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../../Entity/User";
import {ConfirmationLink} from "../../Entity/ConfirmationLink";
import {LessThan} from "typeorm";
import { format } from "date-fns";

@Resolver()
class ConfirmUserResolver {
    @Mutation(()=>Boolean)
    async ConfirmUser(
        @Arg('token') token: string
    ): Promise<Boolean> {
        const confirmationLink = await ConfirmationLink.findOneOrFail({where: {token, expiry: (date: Date) => LessThan(format(date, 'YYYY-MM-DD HH:MM:SS'))}})
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