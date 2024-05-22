import { CommentsGuard } from './comments.guard';
import { CommentsService } from './comments.service';

describe('CommentsGuard', () => {
  const commentsService = {
    findall: jest.fn(),
  } as unknown as CommentsService;
  it('should be defined', () => {
    expect(new CommentsGuard(commentsService)).toBeDefined();
  });
});
