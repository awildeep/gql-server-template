import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../../Entity/User';

@ValidatorConstraint({ async: true })
export class isEmailUsedConstraint implements ValidatorConstraintInterface {
    validate(email: string): Promise<boolean | User> {
        return User.findOne({ where: { email } }).then((user) => {
            return !user;
        });
    }
}

export function isEmailUsed(
    validationOptions?: ValidationOptions,
): (object: { constructor: () => unknown }, propertyName: string) => void {
    return function (object: { constructor: () => unknown }, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isEmailUsedConstraint,
        });
    };
}
