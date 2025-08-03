import { ActiveUser } from "./ActiveUser";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockFullName } from "@/domain/value-objects/FullName.mock";
import { mockCPF } from "@/domain/value-objects/CPF.mock";
import { mockEmailAddress } from "@/domain/value-objects/EmailAddress.mock";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { mockUserRole } from "@/domain/enums/UserRole.mock";

export const mockActiveUser = (): ActiveUser =>
{
  return ActiveUser.create(
  {
    id: mockUuid(),
    name: mockFullName(),
    cpf: mockCPF(),
    email: mockEmailAddress(),
    password: mockHashedPassword(),
    createdAt: mockNonFutureDatetime(),
    role: mockUserRole(),
  });
};
