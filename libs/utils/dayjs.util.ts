import Dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import tz from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc';

const LAST_MODIFIED_HEADER_FORMAT = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';

Dayjs.extend(utc);
Dayjs.extend(duration);
Dayjs.extend(tz);

export const getLastModifiedHeaderFormat = (params: Date) => {
  return dayjs(params).utc().format(LAST_MODIFIED_HEADER_FORMAT);
};

export const dayjs = Dayjs;
