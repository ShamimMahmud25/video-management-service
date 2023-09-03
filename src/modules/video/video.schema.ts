import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'mongoose'

@Schema({ timestamps: true}
)
@ObjectType()
export class Video {
  @Field(() => String)
  _id: string;
  @Prop()
  @Field(() => String, { description: 'Video Title' })
  title: string;

  @Prop()
  @Field(() => String, { description: 'Video Description' })
  description: string;
  @Prop()
  @Field(() => String, { description: 'Video url' })
  url: string;
}

export type VideoDocument = Video & Document;

export const VideoSchema = SchemaFactory.createForClass(Video);