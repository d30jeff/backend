import {
  camelCase,
  capitalCase,
  constantCase,
  kebabCase,
  pascalCase,
  snakeCase,
} from 'change-case-all';

export class StringUtil {
  static Trim(params: string) {
    return params.replace(/\s{2,}/g, ' ').trim();
  }
  static SnakeCase(params: string): string {
    return snakeCase(params);
  }

  static PascalCase(params: string): string {
    return pascalCase(params);
  }

  static KebabCase(params: string): string {
    return kebabCase(params);
  }

  /**
   * AKA Title Case
   * e.g. "Hello World"
   */
  static CapitalCase(params: string): string {
    return capitalCase(params);
  }

  // Alias for Capital case
  static TitleCase(params: string): string {
    return this.CapitalCase(params);
  }

  static CamelCase(params: string): string {
    return camelCase(params);
  }

  static ConstantCase<T>(params: string): T {
    return constantCase(params) as unknown as T;
  }
}
