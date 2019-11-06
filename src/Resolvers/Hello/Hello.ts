import {Authorized, Query, Resolver} from "type-graphql";

@Resolver()
class HelloResolver {
    @Authorized(['User'])
    @Query(() => String, {name: 'helloWorld'})
    async Hello() {
        return "Hello world!";
    }
}

export default HelloResolver;