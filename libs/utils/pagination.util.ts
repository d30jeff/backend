import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Request } from 'express';

export class PaginationQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 1)
  @IsInt()
  @Min(1)
  @Max(1000)
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 10)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

}

export interface PaginationQueries {
  page: number;
  limit: number;
}

export class Pagination {
  page: number;
  limit: number;
  totalPages!: number;
  totalResults!: number;
  constructor({
    page,
    limit,
    total,
  }: Record<'page' | 'limit' | 'total', number>) {
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
    this.totalResults = total;
  }
}

export const serializePaginationParams = (req: Request): PaginationQueries => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 50;
  if (page <= 0) {
    page = 1;
  }

  if (limit <= 0) {
    limit = 50;
  }

  if (limit > 100) {
    limit = 50;
  }

  return {
    limit,
    page,
  };
};
