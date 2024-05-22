import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { createQueryBuilder, EntityManager } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
        provide: getRepositoryToken(Post),
        useValue: {
          createQueryBuilder: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
          findOneBy: jest.fn(),
          delete: jest.fn(),
        }
        },
        {
          provide: EntityManager,
          useClass: jest.fn(),
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
