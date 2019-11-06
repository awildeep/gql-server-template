import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {Role} from "../../../Entity/Role";

@ValidatorConstraint({ async: true })
export class isRoleUsedConstraint implements ValidatorConstraintInterface {
    validate(name: any ) {
        return Role.findOne({where: {name}}).then(role => {
            return !role;
        });
    }
}

export function isRoleUsed(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isRoleUsedConstraint
        });
    };
}