import { Database } from '@libs/providers/database/database.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(
    @Inject(Database.TOKEN)
    private database: Database.Provider,
  ) {}
}
