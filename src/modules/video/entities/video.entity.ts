import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps: true})
@ObjectType()
export class Video {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Video Title',nullable:true })
  title: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Video Description',nullable:true })
  description: string;
  @Prop({ required: true })
  @Field(() => String, { description: 'Video url' })
  url: string;
  @Field(() => Date, { description: 'Video updation date',nullable:true })
  @Prop()
  updatedAt: Date;
  @Field(() => Date, { description: 'Video creation date' ,nullable:true})
  @Prop()
  createdAt?: Date;
  @Field(() => String, { description: 'Video ID' ,nullable:true})
  @Prop()
  videoID?:string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
