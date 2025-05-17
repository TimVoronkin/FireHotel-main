import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isTrackNumber', async: false })
export class IsTrackNumber implements ValidatorConstraintInterface {
  validate(tn: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    return /TFB-\d\d\d\d\d\d$/.test(tn);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Track number must be in format TFB-XXXXXX`;
  }
}
