import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag>{
  async findTagName(tagName) {
    const reuslt = await this.find({tagName})
    return reuslt;
  }

  async createTag(tagName) {
    const result = await this.save({tagName});
    return result;
  }

  async getTagNameWithIds(tagIds: object|any){
    const tagNames = await this.findByIds(tagIds, { select: ["tagName"]})
    const result = tagNames.map((each) => each.tagName);
    return result;
  }

  async getTagId(tagName: string): Promise<number> {
    const tagId = await this.find({where: {tagName}, select: ["id"]});
    if(!tagId || tagId.length === 0) {
      return undefined
    } else {
      return tagId[0].id;
    }
  }
}