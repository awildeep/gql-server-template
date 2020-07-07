import { MinLength, Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { isEmailUsed } from '../Validate/isEmailUsed';

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 100)
    firstName: string;

    @Field()
    @Length(1, 100)
    lastName: string;

    @Field()
    @IsEmail()
    @isEmailUsed({ message: 'Email already in use' })
    email: string;

    @Field()
    @MinLength(7)
    password: string;
}
