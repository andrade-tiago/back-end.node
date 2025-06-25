import { User } from "@/domain/entities/user";

export type OrderGetByUserIdUseCaseInput = {
  userId: User['id']['value'];
  pageSize: number;
  pageNumber: number;
}
