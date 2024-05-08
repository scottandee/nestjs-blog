import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentsGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.commentsService.isOwner(request.user.id, request.params.id);
  }
}
