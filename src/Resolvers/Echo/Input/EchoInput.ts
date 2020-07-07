import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class EchoInput {
    @Field()
    @MinLength(3)
    value: string;
}
