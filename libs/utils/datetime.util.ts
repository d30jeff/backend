import { dayjs } from '@libs/utils/dayjs.util';

export class DateTimeUtil {
  static ToUtc(date: Date | null): string | null {
    return date ? dayjs(date).utc()
      .format() : null;
  }
}
