import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenderModule } from './gender/gender.module';
import { PublisherCompanyModule } from './publisher-company/publisher-company.module';
import * as cors from 'cors';

@Module({
  imports: [UsersModule, AuthModule, BookModule, AuthorModule, GenderModule, PublisherCompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
