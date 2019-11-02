import { Field, InputType} from "type-graphql";

@InputType()
export class RefreshTokenInput {
    @Field()
    token: string;
}