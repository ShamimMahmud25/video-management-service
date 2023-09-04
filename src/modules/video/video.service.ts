import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateVideoInput } from "./dto/create-video-input";
import { UpdateVideoInput } from "./dto/update-video-input";
import { Model } from "mongoose";
import { Video } from "./entities/video.entity";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuid } from "uuid";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>
  ) {}

  async create(createVideoInput: CreateVideoInput): Promise<Video> {
    try {
      const videoID = uuid();
      const createObj = { ...createVideoInput, videoID };
      if (
        createObj.title === "" ||
        createObj.description === "" ||
        createObj.url === ""
      ) {
        throw new UnprocessableEntityException("Required fied is missing");
      }
      const video = new this.videoModel(createObj);
      return await video.save();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.videoModel.find();
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong!");
    }
  }

  async findOne(id: string): Promise<Video> {
    try {
      const video = await this.videoModel.findOne({ _id: id });
      if (!video) throw new NotFoundException("Video Not Found");
      return video;
    } catch (error) {
      throw new NotFoundException("Video Not Found");
    }
  }

  async update(id: string, updateVideoInput: UpdateVideoInput): Promise<Video> {
    try {
      if (
        updateVideoInput.title === "" ||
        updateVideoInput.description === "" ||
        updateVideoInput.url === "" ||
        id === ""
      ) {
        throw new UnprocessableEntityException("Required fied is missing");
      }
      const updatedVideo = await this.videoModel.findByIdAndUpdate(
        id,
        updateVideoInput,
        {
          new: true,
        }
      );
      if (!updatedVideo) throw new NotFoundException("Your Video Not Found");
      return updatedVideo;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(id: string): Promise<Video> {
    try {
      if (!id) {
        throw new UnprocessableEntityException("Id is missing");
      }
      const deltedVideo = await this.videoModel.findByIdAndDelete(id);
      if (!deltedVideo) throw new NotFoundException("Your Video Not Found");
      return deltedVideo;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
