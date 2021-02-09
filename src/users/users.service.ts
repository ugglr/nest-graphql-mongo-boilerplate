import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { USER } from '../constants';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UpdateUserDto } from './dto/updatedUser.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDto> {
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

  async update(updateUserInput: UpdateUserInput): Promise<UpdateUserDto> {
    const { userId, newEmail, newName } = updateUserInput;

    try {
      const updatedUser = await this.userModel.findById(userId);
      let shouldPatchDB = false;
      if (!updatedUser) throw new NotFoundException('User not found!');

      if (newEmail && newEmail !== updatedUser.email) {
        updatedUser.email = newEmail;
        shouldPatchDB = true;
      }

      if (newName && newName !== updatedUser.name) {
        updatedUser.name = newName;
        shouldPatchDB = true;
      }

      if (shouldPatchDB) {
        updatedUser.save();
      }

      return {
        id: userId,
        success: shouldPatchDB,
      };
    } catch (updateUserError) {
      throw new Error(updateUserError.message);
    }
  }

  async getUsers() {
    try {
      const users = await this.userModel.find().exec();
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user?.name,
      }));
    } catch (getUsersError) {
      console.log(getUsersError.message);
    }
  }
}
