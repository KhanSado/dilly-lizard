import { Prisma } from "@prisma/client";

export class Book implements Prisma.BookCreateInput {
    qtdPages: number;
    qtdRead: number;
    lastRead?: string | Date;
    isReading: boolean;
    readed: boolean;
    id?: string;
    subtitle?: string;
    title: string;
    sumary: string;
    bookCover?: string;
    user_owner: Prisma.UsersCreateNestedOneWithoutBookInput;
    author: Prisma.AuthorCreateNestedOneWithoutBookInput;
    gender: Prisma.GenderCreateNestedOneWithoutBookInput;
    publisherCompany: Prisma.PublishingCompanyCreateNestedOneWithoutBookInput;
}