import { Prisma } from "@prisma/client";

export class Gender implements Prisma.GenderCreateInput {
    id?: number;
    name: string;
    description: string;
    usersId: number;
    user_owner?: Prisma.UsersCreateNestedOneWithoutBookInput;
}