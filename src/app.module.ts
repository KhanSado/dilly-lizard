import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
@Module({
  imports: [UsersModule, AuthModule, BookModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
