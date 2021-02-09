import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDto {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;
}
