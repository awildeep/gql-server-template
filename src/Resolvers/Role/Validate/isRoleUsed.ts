import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from '../../../Entity/Role';

@ValidatorConstraint({ async: true })
export class isRoleUsedConstraint implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    validate(name: string): Promise<any> {
        return Role.findOne({ where: { name } }).then((role) => {
            return !role;
        });
    }
}

export function isRoleUsed(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isRoleUsedConstraint,
        });
    };
}
