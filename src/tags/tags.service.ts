import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { EntityManager, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = new Tag(createTagDto);
    return this.entityManager.save(tag);
  }

  findAll(page: number): Promise<Tag[]> {
    return this.tagsRepository.find({
      relations: { posts: true },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  findOne(id: number) {
    return this.tagsRepository.findOne({
      where: { id },
      relations: { posts: true },
    })
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagsRepository.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException();
    }
    tag.name = updateTagDto.name;
    return this.entityManager.save(tag);    
  }

  remove(id: number) {
    return this.tagsRepository.createQueryBuilder('tag')
      .delete()
      .where('tag.id = :id', { id })
      .execute();
  }

//   async isOwner(userId: number, tagId: number) {
//     const post = await this.tagsRepository.findOne({
//       where: { id: +tagId },
//       relations: { post: true },
//     });
//     if (!post) {
//       throw new NotFoundException();
//     }
//     if (post.author.id === userId) {
//       return true;
//     }
//     return false;
//   }
// }
}