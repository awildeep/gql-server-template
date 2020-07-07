import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RoleCreateInput {
    @Field()
    @MinLength(3)
    name: string;
}
