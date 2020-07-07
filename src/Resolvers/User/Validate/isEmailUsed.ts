import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../../Entity/User';

@ValidatorConstraint({ async: true })
export class isEmailUsedConstraint implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    validate(email: any): Promise<any> {
        return User.findOne({ where: { email } }).then((user) => {
            return !user;
        });
    }
}

export function isEmailUsed(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isEmailUsedConstraint,
        });
    };
}
