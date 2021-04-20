import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  oldPassword: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  newPasswordVerify: string;
}
