import { compileFunction } from 'vm';
import { PostsGuard } from './posts.guard';
import { PostsService } from './posts.service';

describe('PostsGuard', () => {  

  it('should be defined', () => {
    const postsService = {
      findall: jest.fn(),
    } as unknown as PostsService;
    expect(new PostsGuard(postsService)).toBeDefined();
  });
});
