import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './repositories/comments.repository';
import { ArticleRepository } from 'src/articles/repositories/article.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsService, UsersService],
  controllers: [CommentsController],
  imports: [
    TypeOrmModule.forFeature([CommentRepository, ArticleRepository, UserRepository]),
    JwtModule.register({ secret: process.env.JWT_SECRET })]
})
export class CommentsModule {}