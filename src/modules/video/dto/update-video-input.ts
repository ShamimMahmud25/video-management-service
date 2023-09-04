import { CreateVideoInput } from './create-video-input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => String)
  _id: string;
  @Field(() => String, { description: 'Video Title' })
  title: string;
  @Field(() => String, { description: 'Video Description' })
  description: string;
  @Field(() => String, { description: 'Video url' })
  url: string;
}
