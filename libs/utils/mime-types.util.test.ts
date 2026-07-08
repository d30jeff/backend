import { typeToExtension } from '@libs/utils/mime-types.util';

describe('Mime Types Util', () => {
  test('Should create .png when mime type is image/png', () => {
    const extension = typeToExtension('image/png');
    expect(extension).toBe('png');
  });

  test('Should create .jpg when mime type is image/jpeg', () => {
    const extension = typeToExtension('image/jpeg');
    expect(extension).toBe('jpg');
  });
});
