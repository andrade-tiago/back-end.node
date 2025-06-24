import { UserOutput } from "@/application/use-cases/user.output";
import { User } from "@/domain/entities/user";
import { IUserMapper } from "../user.mapper";

export class UserMapper implements IUserMapper {
  public toOutput(user: User): UserOutput {
    return {
      id: user.id.value,
      name: user.isActive() ? user.name.value : null,
      cpf: user.isActive() ? user.cpf.value : null,
      email: user.isActive() ? user.email.value : null,
      role: user.isActive() ? user.role.value : null,
      createdAt: new Date(user.createdAt.value).toISOString(),
      deletedAt: user.isDeleted() ? new Date(user.deletedAt.value).toISOString() : null,
    };
  }
}
