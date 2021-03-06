import { Query, Resolver } from 'type-graphql';
import { Status } from '../../Entity/Status';

@Resolver()
class StatusResolver {
    @Query(() => Status, { name: 'status' })
    async Status(): Promise<{ up: boolean }> {
        return {
            up: true,
        };
    }
}

export default StatusResolver;
