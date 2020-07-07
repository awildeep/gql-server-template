import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { EchoInput } from './Input/EchoInput';

@Resolver()
class EchoResolver {
    @Authorized(['User'])
    @Query(() => String)
    async Echo(@Arg('input') { value }: EchoInput): Promise<string> {
        return value;
    }
}

export default EchoResolver;
