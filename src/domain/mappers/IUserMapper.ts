import type { User } from "@/domain/entities/User";
import type { UserOutput } from "@/application/dtos/UserOutput";

export interface IUserMapper {
  toOutput(user: User): UserOutput;
}
