import { UserLoginInput } from "./user-login.input";
import { ErrorMessages } from "@/domain/constants/error-messages";
import { TokenPayload } from "@/domain/value-objects/token-payload.vo";
import { IAuthService } from "@/domain/services/auth.service";
import { InvalidDataError } from "@/domain/errors/invalid-data-error";
import { IEmailFactory } from "@/application/factories/value-objects/email.factory";
import { IUserRepository } from "@/domain/repositories/user.repository";

export class UserLoginUseCase {
  constructor(
    private readonly _emailFactory: IEmailFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _authService: IAuthService,
    private readonly _ttlInSec: number,
  ) {}

  public async execute(input: UserLoginInput): Promise<string> {
    const userEmail = this._emailFactory.create(input.email);
    
    const user = await this._userRepository.findByEmail(userEmail);
    if (!user) {
      throw new InvalidDataError(ErrorMessages.LoginError);
    }

    const passwordIsCorrect = await user.password.compareWith(input.password);
    if (!passwordIsCorrect) {
      throw new InvalidDataError(ErrorMessages.LoginError);
    }

    const payload = new TokenPayload({
      sub: user.id,
      email: user.email,
      ttlInSec: this._ttlInSec,
    });
    return await this._authService.generateToken(payload);
  }
}
