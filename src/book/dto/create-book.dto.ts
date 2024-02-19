export class CreateBookDto {
    title:string;
    subtitle?:string;
    sumary:string;
    bookCover?:string;
    isReading?: boolean;
    readed?: boolean;
    qtdPages: number;
    qtdRead: number;
    lastRead?: string | Date;
  }
  