import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { CommentsGuard } from './comments.guard';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    const user = await this.usersService.findOne(req.user.username);
    return this.commentsService.create(user, createCommentDto);
  }

  @Get()
  findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
    return this.commentsService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(CommentsGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(CommentsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
