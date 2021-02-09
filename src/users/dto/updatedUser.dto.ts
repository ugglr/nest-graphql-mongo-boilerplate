import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserDto {
  @Field(() => ID)
  id: string;

  @Field()
  success: boolean;
}
