import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-role.model';
import { Post } from './post.model';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
