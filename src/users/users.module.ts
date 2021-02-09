import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { userProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver, ...userProviders],
})
export class UsersModule {}
