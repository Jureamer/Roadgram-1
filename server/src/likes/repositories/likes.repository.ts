import { EntityRepository, Repository } from 'typeorm';
import { LikesDto } from '../dto/likes.dto';
import { Likes } from '../entities/likes.entity';

@EntityRepository(Likes)
export class LikesRepository extends Repository<Likes> {
    async likeOrNot(likesDto: LikesDto) {
      const { user, articleId } = likesDto;
      return await this.findOne({
        userId: user,
        articleId: articleId,
      });
    };

    async likeArticle(likesDto: LikesDto): Promise<string> {
      const { user, articleId } = likesDto;
      const newLike = this.create({
        userId: user,
        articleId: articleId
      });
      await this.save(newLike);
      return 'like this post';
    };

    async unlikeArticle(likesDto: LikesDto): Promise<string> {
      const { user, articleId } = likesDto;
      await this.delete({
        userId: user,
        articleId: articleId,
      });
      return 'unlike this post';
    };
}
