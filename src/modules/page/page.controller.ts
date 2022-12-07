import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_TYPES } from 'src/types';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  findAll() {
    return this.pageService.findAll();
  }

  @Get(':id')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
  }

  @Get('default/store-pages')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  findAllByStore(@Request() req: { user: { id: string } }) {
    return this.pageService.findAllByStore(req.user.id);
  }

  @Post()
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  create(
    @Body() createPageDto: CreatePageDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.pageService.create(createPageDto, req.user.id);
  }

  @Patch(':id')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(id, updatePageDto);
  }

  @Delete(':id')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.pageService.remove(id);
  }
}
