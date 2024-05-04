import { Injectable } from '@nestjs/common';
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
      // relations: { posts: true },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
