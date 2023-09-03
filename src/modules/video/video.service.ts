import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video-input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>,
  ) {}

  async create(createVideoInput: CreateVideoInput) {
    try {
      const videoID = uuid();
      const createObj = { ...createVideoInput, videoID };
      const video = new this.videoModel(createObj);
      return await video.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.videoModel.find();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const video = await this.videoModel.findOne({ _id: id });
      if (!video) {
        return 'Video not found';
      }
      return video;
    } catch (error) {
      return new Error('Not found');
    }
  }

  update(id: string, updateVideoInput: UpdateVideoInput) {
    return this.videoModel.findOneAndUpdate({ _id: id }, updateVideoInput);
  }

  delete(id: string) {
    return this.videoModel.findOneAndDelete({ _id: id });
  }
}
