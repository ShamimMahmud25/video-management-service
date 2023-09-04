import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';

import { CreateVideoInput } from './dto/create-video-input';
import { UpdateVideoInput } from './dto/update-video-input';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => Video)
 async createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput):Promise<Video> {
    return await this.videoService.create(createVideoInput);
  }

  @Query(() => Video, { name: 'FindOne' })
  async findOne(@Args('id', { type: () => String }) id: string):Promise<Video> {
    return await this.videoService.findOne(id);
  }

  @Query(() => [Video], { name: 'video' })
  findAll() {
    return this.videoService.findAll().then((result) => {
      return result;
    });
  }

  @Mutation(() => Video)
  async updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput):Promise<Video> {
    return await this.videoService.update(updateVideoInput._id, updateVideoInput);
  }

  @Mutation(() => Video)
  async deleteVideo(@Args('id', { type: () => String }) id: string):Promise<Video> {
    return await this.videoService.delete(id);
  }
}
