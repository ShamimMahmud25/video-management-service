import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String, { description: 'Video Title' })
  title: string;
  @Field(() => String, { description: 'Video Description' })
  description: string;
  @Field(() => String, { description: 'Video url' })
  url: string;
}
