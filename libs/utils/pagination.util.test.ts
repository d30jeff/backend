import { Pagination } from '@libs/utils/pagination.util';

describe('Pagination Util', () => {
  describe('Class', () => {
    test('Should generate the correct totalPages based on given params', () => {
      const pagination = new Pagination({
        limit: 5,
        page: 1,
        total: 15,
      });

      expect(pagination.page).toBe(1);
      expect(pagination.totalPages).toBe(3);
      expect(pagination.limit).toBe(5);
      expect(pagination.totalResults).toBe(15);
    });
  });
});
