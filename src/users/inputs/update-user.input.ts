import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  newEmail: string;

  @Field({ nullable: true })
  newName: string;
}
