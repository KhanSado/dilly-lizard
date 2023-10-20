import { Prisma } from "@prisma/client";

export class Book implements Prisma.BookCreateInput {
    id?: string;
    subtitle?: string;
    title: string;
    sumary: string;
    user_owner: Prisma.UsersCreateNestedOneWithoutBookInput;
    author?: Prisma.AuthorCreateNestedOneWithoutBookInput;
}