import { Common } from '@libs/common/src/common.interface';
import { ModuleService } from '@libs/common/src/module/module.service';
import { RoleService } from '@libs/common/src/role/role.service';
import { User } from '@libs/common/src/user/user.interface';
import { UserService } from '@libs/common/src/user/user.service';
import { UserRole } from '@libs/common/src/user-role/user-role.interface';
import { Prisma } from '@libs/prisma/client';
import { UserRoleRepository } from '@libs/repositories/user-role.repository';
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class UserRoleService {
  private readonly logger = new Logger(UserRoleService.name);

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly moduleService: ModuleService,
    private readonly roleService: RoleService,
    private readonly userRoleRepository: UserRoleRepository,
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,

  ) { }

  async create(params: UserRole.Create.Params, connection?: Prisma.TransactionClient) {
    const {
      roleCode, userID, moduleCode,
    } = params;

    this.logger.log(`Checking existence of user ID: ${userID}`);
    const user = await this.userService.findOne({ ID: userID }, connection);

    if (!user) {
      this.logger.log('User not found');
      throw new User.Exceptions.NotFound(`The User with ID: ${userID} does not exist`);
    }

    this.logger.log('Checking existence of userRole', {
      roleCode,
      roleCodeLength: roleCode.length,
      user,
      userID,
    });

    // await this.findOne({
    //   roleCode,
    //   userID,
    // }, connection);

    const role = await this.roleService.findOne({
      code: roleCode,
      moduleCode: this.common.module,
      options: {
        throwIfNotFound: true,
      },
    }, connection);

    const module = await this.moduleService.findOne({
      code: moduleCode,
      options: {
        throwIfNotFound: true,
      },
    }, connection);

    return this.userRoleRepository.create(
      {
        data: {
          Module: {
            connect: {
              ID: module.ID,
            },
          },
          Role: {
            connect: {
              ID: role.ID,
            },
          },
          User: {
            connect: {
              ID: user.ID,
            },
          },
        },
      },
      connection,
    );
  }

  async list(params: UserRole.List.Params) {
    const {
      user,
      moduleCode,
      userPermissions,
    } = params;

    return this.userRoleRepository.findMany({
      where: {
        Module: { code: moduleCode },
        userID: user.ID,
      },
    });

  }
}
