import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  buildMessage,
  registerDecorator,
  validateOrReject,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import {
  IsDefined as DefaultIsDefined,
  IsEmail as DefaultIsEmail,
  IsIn as DefaultIsIn,
  IsNotEmpty as DefaultIsNotEmpty,
  MaxLength as DefaultMaxLength,
  MinLength as DefaultMinLength,
} from 'class-validator';

export const IsDefined = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsDefined({
    ...validationOptions,
    message: '$property is required',
  });
};

export const IsIn = (values: readonly any[], validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsIn(values, {
    ...validationOptions,
    message: '$property must be in $constraint1',
  });
};

export const MaxLength = (max: number = 100, validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultMaxLength(max, {
    ...validationOptions,
    message: '$property cannot be more than $constraint1 characters',
  });
};

export const MinLength = (min: number = 2, validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultMinLength(min, {
    ...validationOptions,
    message: '$property needs to be at least $constraint1 characters',
  });
};

export const IsNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsNotEmpty({
    ...validationOptions,
    message: '$property cannot be blank',
  });
};
export const IsEmail = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsEmail({}, { ...validationOptions, message: '$property must be a valid email' });
};

export async function validate<T>(cls: ClassConstructor<any>, plain: object): Promise<T | null> {
  const object = plainToInstance(cls, plain);

  if (!object) {
    return null;
  }

  await validateOrReject(object, {
    whitelist: true,
  });

  return object;
}

export function IsValidPictureURI(property: string = 'pictureURI', validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [property],
      name: 'isValidPictureURI',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage: buildMessage((eachPrefix) => `${eachPrefix} $property must be a valid URI`, validationOptions),
        validate: async (value: any, args: ValidationArguments) => {
          try {
            // await shared.services.s3.validateObjectByKey(value);
          } catch (error) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

/**
 * Ensures that the length of the property is <= another property length + offset.
 * @param property - the property to compare against (e.g. "name")
 * @param offset - adjustment to the max length (e.g. -1 means must be shorter by 1)
 * @param validationOptions - optional class-validator options
 */
export function MaxLengthRelativeTo(property: string, offset = 0, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [property, offset],
      name: 'maxLengthRelativeTo',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          const [property, offset] = args.constraints;
          return `${args.property} must be at most ${offset} characters shorter than ${property}`;
        },
        validate(value: unknown, args: ValidationArguments) {
          const [property, offset] = args.constraints;
          const obj = args.object as Record<string, any>;
          const compareVal = obj[property];

          if (!compareVal || typeof compareVal !== 'string') {
            return true;
          }
          if (typeof value !== 'string') {
            return true;
          }

          return value.length <= compareVal.length + offset;
        },
      },
    });
  };
}

/**
 * Ensures that if the property has the same length as another property,
 * the values must be identical.
 * @param property - the property to compare against (e.g. "name")
 * @param validationOptions - optional class-validator options
 */
export function MustMatchIfSameLength(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [property],
      name: 'mustMatchIfSameLength',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return `${args.property} must be identical to ${relatedProperty} if they have the same length`;
        },
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          const obj = args.object as Record<string, any>;
          const compareVal = obj[relatedProperty];

          if (!compareVal || typeof compareVal !== 'string') {
            return true;
          }
          if (typeof value !== 'string') {
            return true;
          }
          if (value.length === compareVal.length) {
            return value === compareVal;
          }

          return true;
        },
      },
    });
  };
}
