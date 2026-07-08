import { Role } from '@libs/common/src/role/role.interface';
import { Prisma } from '@libs/prisma/client';
import { RoleRepository } from '@libs/repositories/role.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) { }

  async populate() {
    // await this.rolesRepository.createMany({
    //   data: roles.map((role) => {
    //     return {
    //       Code: role.code,
    //       IsActive: role.isActive,
    //       Name: role.name,
    //     };
    //   }),
    //   skipDuplicates: true,
    // });
  }

  async findOne(params: Role.FindOne.Params, connection?: Prisma.TransactionClient) {
    const {
      code, options,
    } = params;

    const where: Prisma.RoleWhereInput = {
      code: code || Prisma.skip,
    };

    const existing = await this.roleRepository.findFirst(
      {
        where,
      },
      connection,
    );

    if (existing && options?.throwIfExists) {
      throw new Role.Exceptions.AlreadyExists();
    }

    if (!existing && options?.throwIfNotFound) {
      throw new Role.Exceptions.NotFound();
    }

    return existing;
  }
}
