import type { ActiveUser, DeletedUser } from "@/domain/entities/User";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";
import type { CpfCreateValue } from "@/domain/value-objects/CPF";
import type { EmailAddressCreateValue } from "@/domain/value-objects/EmailAddress";
import type { FullNameCreateValue } from "@/domain/value-objects/FullName";
import type { HashedPassword } from "@/domain/value-objects/HashedPassword";
import type { NonFutureDatetimeCreateValue } from "@/domain/value-objects/NonFutureDatetime";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";

export type UserFactoryCreateActive = {
  id?: UuidCreateValue;
  name: FullNameCreateValue;
  cpf: CpfCreateValue;
  email: EmailAddressCreateValue;
  password: HashedPassword;
  createdAt?: NonFutureDatetimeCreateValue;
  role?: UserRoleEnum | string;
}

export type UserFactoryCreateDeleted = {
  id: UuidCreateValue;
  createdAt: NonFutureDatetimeCreateValue;
  deletedAt?: NonFutureDatetimeCreateValue;
}

export interface IUserFactory {
  createActive(data: UserFactoryCreateActive): ActiveUser;
  createDeleted(data: UserFactoryCreateDeleted): DeletedUser;
}
