import { Common } from '@libs/common/src/common.interface';
import { RequiredPermission } from '@libs/common/src/permission/permission.decorator';
import { Upload } from '@libs/common/src/upload/upload.interface';
import { UploadService } from '@libs/common/src/upload/upload.service';
import { User } from '@libs/common/src/user/user.interface';
import { CurrentUser } from '@libs/decorators/current-user.decorator';
import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';

@Controller('/uploads')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
  ) {}

  @Post('/')
  @RequiredPermission('Upload.Create')
  create(@Body() body: Upload.Create.Payload, @CurrentUser() user: User.Response) {
    return this.uploadService.createSignedUploadUrl({
      userID: user.ID,
      ...body,
    });
  }

}
