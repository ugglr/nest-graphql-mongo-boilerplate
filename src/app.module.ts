import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
// DB
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
// Users
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
