import {Query, Resolver} from "type-graphql";

@Resolver()
class HelloResolver {
    @Query(() => String, {name: 'helloWorld'})
    async Hello() {
        return "Hello world!";
    }
}

export default HelloResolver;