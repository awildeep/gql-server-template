import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from '../../../Entity/Role';

@ValidatorConstraint({ async: true })
export class isRoleUsedConstraint implements ValidatorConstraintInterface {
    validate(name: string): Promise<boolean | Role> {
        return Role.findOne({ where: { name } }).then((role) => {
            return !role;
        });
    }
}

export function isRoleUsed(
    validationOptions?: ValidationOptions,
): (object: { constructor: () => unknown }, propertyName: string) => void {
    return function (object: { constructor: () => unknown }, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isRoleUsedConstraint,
        });
    };
}
