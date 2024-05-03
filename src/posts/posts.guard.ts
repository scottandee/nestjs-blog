import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.postsService.isOwner(request.user.id, request.params.id);
  }
}
