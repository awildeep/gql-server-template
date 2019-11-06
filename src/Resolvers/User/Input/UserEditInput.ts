import { MinLength, Length, IsEmail} from "class-validator";
import { Field, InputType} from "type-graphql";
import {isEmailUsed} from "../Validate/isEmailUsed";

@InputType()
export class UserEditInput {
    @Field()
    userId: number;

    @Field()
    @Length(1,100)
    firstName: string;

    @Field()
    @Length(1,100)
    lastName: string;

    @Field()
    @IsEmail()
    @isEmailUsed({message: "Email already in use"})
    email: string;

    @Field({nullable: true})
    @MinLength(7)
    password?: string;

    @Field()
    isActive: boolean;
}