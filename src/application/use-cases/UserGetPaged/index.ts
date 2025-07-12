import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UserGetPagedInput } from "./input";
import type { UserOutput } from "@/application/dtos/UserOutput";

export class UserGetPagedUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(props: UserGetPagedInput): Promise<UserOutput[]> {
    const users = await this._userRepository.getPaged({
      pageNumber: props.pageNumber,
      pageSize: props.pageSize,
    });

    return users.map(this._userMapper.toOutput);
  }
}

