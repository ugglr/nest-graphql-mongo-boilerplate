import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserInput } from './inputs/create-user.input';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}
