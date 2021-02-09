import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER } from '../constants';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(USER.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserDto> {
    const createdUser = new this.userModel(createUserInput);
    try {
      const res = await createdUser.save();
      return {
        id: res.id,
        email: res.email,
        name: res?.name,
      };
    } catch (createUserError) {
      console.log(createUserError.message);
    }
  }

  async getUsers() {
    try {
      const users = await this.userModel.find().exec();
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        password: null,
        name: user?.name,
      }));
    } catch (getUsersError) {
      console.log(getUsersError.message);
    }
  }
}
