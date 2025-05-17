import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsTrackNumber implements ValidatorConstraintInterface {
    validate(tn: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
