import { Module } from '@libs/common/src/module/module.interface';
import { Prisma } from '@libs/prisma/client';
import { ModuleRepository } from '@libs/repositories/module.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);
  constructor(private readonly moduleRepository: ModuleRepository) {

  }

  async populate() {
    this.logger.log('Initializing Modules');
    const modules = Object.entries(Module.Codes);

    const totalRows = await this.moduleRepository.count({});

    if (modules.length === totalRows) {
      this.logger.debug('Modules have been populated. Skipping...');
      return;
    }

    await this.moduleRepository.createMany({
      data: modules.map(([name, code]) => {
        return {
          code,
          name,
        };
      }),
      skipDuplicates: true,
    });
  }

  async findOne(params: Module.FindOne.Params, connection?: Prisma.TransactionClient) {
    const where: Prisma.ModuleWhereInput = {
      code: params.code,
    };

    const result = await this.moduleRepository.findFirst({
      where,
    }, connection);

    return result;

  }
}
