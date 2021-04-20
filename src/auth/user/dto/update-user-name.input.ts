import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserNameInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  oldName: string;

  @Field(() => String)
  newName: string;
}
