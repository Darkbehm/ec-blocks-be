import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { USER_TYPES } from 'src/types';
import { RolesGuard } from 'src/modules/auth/guards/roles.guards';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'favIcon' }, { name: 'logo' }]),
  )
  create(
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFiles()
    files: { favIcon: [Express.Multer.File]; logo: [Express.Multer.File] },
  ) {
    return this.storeService.create(createStoreDto, files);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
