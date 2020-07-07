import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { MyContextType } from '../../Types/MyContextType';

@Resolver()
class HelloResolver {
    @Authorized(['User'])
    @Query(() => String, { name: 'helloWorld' })
    async Hello(@Ctx() ctx: MyContextType): Promise<string> {
        return `Hello ${ctx.user.firstName}!`;
    }
}

export default HelloResolver;
