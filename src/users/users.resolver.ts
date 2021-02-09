import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updatedUser.dto';
import { UpdateUserInput } from './inputs/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserDto], { name: 'users', nullable: 'items' })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(() => UpdateUserDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.update(input);
  }
}
