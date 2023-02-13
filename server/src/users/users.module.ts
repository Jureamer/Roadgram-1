import { Module, LoggerService, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ArticleRepository } from 'src/articles/repositories/article.repository';
import { ArticleToTagRepository } from 'src/articles/repositories/article_tag.repository';
import { TagRepository } from 'src/articles/repositories/tag.repository';
import { FollowRepository } from 'src/follow/repositories/follow.repository';
import { LikesRepository } from 'src/likes/repositories/likes.repository';
import { CommentRepository } from 'src/comments/repositories/comments.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            ArticleRepository,
            ArticleToTagRepository,
            TagRepository,
            FollowRepository,
            LikesRepository,
            CommentRepository,
        ]),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
