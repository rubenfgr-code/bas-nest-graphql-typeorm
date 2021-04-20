import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserEmailInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  oldEmail: string;

  @Field(() => String)
  newEmail: string;
}
