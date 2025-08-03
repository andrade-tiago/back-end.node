import { DeletedUser } from "./DeletedUser";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

export const mockDeletedUser = (): DeletedUser =>
{
  return DeletedUser.create({
    id: mockUuid(),
    createdAt: mockNonFutureDatetime(),
    deletedAt: NonFutureDatetime.now(),
  });
};
