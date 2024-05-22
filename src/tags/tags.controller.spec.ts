import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('TagsController', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useClass: jest.fn()
        },
        {
          provide: UsersService,
          useClass: jest.fn()
        },
        {
          provide: JwtService,
          useClass: jest.fn()
        }
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
