import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {User} from "../../../Entity/User";

@ValidatorConstraint({ async: true })
export class isEmailUsedConstraint implements ValidatorConstraintInterface {
    validate(email: any ) {
        return User.findOne({where: {email}}).then(user => {
            return !user;
        });
    }
}

export function isEmailUsed(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isEmailUsedConstraint
        });
    };
}