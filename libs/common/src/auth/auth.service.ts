import { Auth } from '@libs/common/src/auth/auth.interface';
import { Role } from '@libs/common/src/role/role.interface';
import { UserService } from '@libs/common/src/user/user.service';
import { Database } from '@libs/providers/database/database.interface';
import { FirebaseService } from '@libs/providers/firebase/firebase.service';
import { UserRepository } from '@libs/repositories/user.repository';
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(Database.TOKEN)
    private database: Database.Provider,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async signUp(params: Auth.SignUp.Params) {
    const {
      email, moduleCode, password,
    } = params;

    const existing = await this.userRepository.findFirst({
      where: {
        email,
      },
    });

    // TODO: Check if email exists
  }

  async signInWithFirebase(params: Auth.SignInWithProvider.Params) {
    const {
      idToken, moduleCode,
    } = params;

    try {
      const decoded = await this.firebaseService.decodeToken({ idToken });
      this.logger.debug(decoded);

      // if (moduleCode === Module.Codes.Admin && [
      //   config.SUPER_ADMIN_EMAIL, config.TESTING_EMAIL,
      // ].includes(decoded.email) === false) {
      //   throw new Auth.Exceptions.InvalidSession();
      // }

      const existing = await this.userService.findOne({
        email: decoded.email,
        moduleCode,
      });

      if (existing) {
        this.logger.log('Existing user found');
        return existing;
      }

      const {
        email,
        disabled,
        emailVerified,
        displayName,
        uid,
        phoneNumber,
        photoURL,
      } = decoded;

      const [firstName, ...lastName] = displayName!.split(' ');

      return this.userService.create({
        email: email!,
        firstName,
        imageUrl: photoURL,
        lastName: lastName.join(' '),
        moduleCode,
        phone: phoneNumber,
        roleCode: Role.Codes.SuperAdmin,
      });

    } catch (error) {
      this.logger.fatal('Something went wrong', error);
      if (error?.errorInfo?.code === 'auth/id-token-expired') {
        throw new Auth.Exceptions.IdTokenExpired();
      } else if (error?.errorInfo?.code === 'auth/argument-error') {
        throw new Auth.Exceptions.IdTokenExpired();
      }
      throw error;
    }
  }

}
