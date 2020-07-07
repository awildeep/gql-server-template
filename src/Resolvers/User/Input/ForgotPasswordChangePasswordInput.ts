import { MinLength, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ForgotPasswordChangePasswordInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(7)
    password: string;

    @Field()
    token: string;
}
