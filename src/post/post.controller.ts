import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }
}
