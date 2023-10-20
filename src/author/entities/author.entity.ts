import { Prisma } from "@prisma/client";

export class Author implements Prisma.AuthorCreateInput {
    id?: number;
    name: string;
    lastname: string;
    user_owner?: Prisma.UsersCreateNestedOneWithoutBookInput;
}