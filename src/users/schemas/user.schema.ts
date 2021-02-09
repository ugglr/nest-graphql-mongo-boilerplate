import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

@ObjectType()
export class User extends mongoose.Document {
  @Field(() => ID, { description: 'User MongoDB ID' })
  id: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  name?: string;
}
