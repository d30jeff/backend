import { Common } from '@libs/common/src/common.interface';
import { Locale } from '@libs/common/src/locale/locale.interface';
import { ModuleService } from '@libs/common/src/module/module.service';
import { Preference } from '@libs/common/src/preference/preference.interface';
import { PreferenceService } from '@libs/common/src/preference/preference.service';
import { RoleService } from '@libs/common/src/role/role.service';
import { User } from '@libs/common/src/user/user.interface';
import { UserProfileService } from '@libs/common/src/user-profile/user-profile.service';
import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { UploadFields } from '@libs/repositories/upload.repository';
import { UserRepository, UserSelect } from '@libs/repositories/user.repository';
import { UserRoleRepository } from '@libs/repositories/user-role.repository';
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(Database.TOKEN) private readonly database: Database.Provider,
    @Inject(forwardRef(() => UserProfileService))
    private readonly userProfileService: UserProfileService,
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
    private readonly userRepository: UserRepository,
    private readonly preferenceService: PreferenceService,
    private readonly moduleService: ModuleService,
    private readonly roleService: RoleService,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async assignRole(params: User.AssignRole.Params, tx?: Prisma.TransactionClient) {
    const {
      roleCode,
      userID,
      moduleCode,
    } = params;

    const module = await this.moduleService.findOne({ code: moduleCode }, tx);

    const role = await this.roleService.findOne({
      code: roleCode,
      moduleCode: this.common.module,
    }, tx);

    const user = await this.findOne({ ID: userID }, tx);

    return this.userRoleRepository.upsert({
      create: {
        Module: { connect: { code: moduleCode } },
        Role: { connect: { ID: role.ID } },
        User: { connect: { ID: user.ID } },
      },
      update: {
        Module: { connect: { code: moduleCode } },
        Role: { connect: { ID: role.ID } },
        User: { connect: { ID: user.ID } },
      },
      where: {
        moduleID_userID_roleID: {
          moduleID: module.ID,
          roleID: role.ID,
          userID: user.ID,
        },
      },
    }, tx);
  }

  async create(params: User.Create.Params, tx?: Prisma.TransactionClient) {
    this.logger.log('Creating User', params);

    const {
      moduleCode,
      email,
      phone,
      firstName,
      lastName,
      imageUrl,
      roleCode,
      sendVerificationEmail,
    } = params;

    const existing = await this.findOne({
      email,
      moduleCode: moduleCode,
    }, tx);

    if (existing) {
      this.logger.log('User already exists. Returning...');
      return existing;
    }

    const data = {
      Module: { connect: { code: moduleCode } },
      email,
    } as Prisma.UserCreateInput;

    if (phone) {
      data.phone = phone;
    }

    const user = await this.database.write.$transaction(async (tx) => {
      const user = await this.userRepository.create(
        {
          data,
          select: UserSelect,
        },
        tx,
      );

      await this.assignRole({
        moduleCode,
        roleCode,
        userID: user.ID,
      }, tx);

      let upload: UploadFields;
      if (imageUrl) {
        // upload = await this.uploadService.uploadFromUrl({
        //   url: imageUrl,
        //   userID: user.ID,
        // }, tx);
      }

      await this.userProfileService.update({
        firstName: firstName!,
        lastName: lastName!,
        // uploadID: upload?.ID,
        userID: user.ID,
      }, tx);

      await this.preferenceService.update({
        appearance: Preference.Appearance.System,
        locale: Locale.Codes.EnglishUS,
        userID: user.ID,
      }, tx);

      // TODO: Set default plan?

      if (sendVerificationEmail) {
        // TODO: Implement email queue for sending verification email
        // TODO: We should also distinguish between the types of email
      }

      // await this.sharedUserPlanService.updatePlan(
      //   {
      //     planCode: SharedPlan.Codes.Free,
      //     user: new SharedUser.Response(user),
      //   },
      //   tx,
      // );

      return user;
    });

    return this.findOne({
      ID: user.ID,
    }, tx);
  }

  async findOne(params: User.FindOne.Params, connection?: Prisma.TransactionClient) {
    const {
      options, email, ID, moduleCode,
    } = params;

    const where: Prisma.UserWhereInput = {};

    const existing = await this.userRepository.findFirst({
      select: UserSelect,
      where,
    }, connection);

    if (!existing && options?.throwIfNotFound) {
      throw new User.Exceptions.NotFound();
    }

    return existing;
  }
}
