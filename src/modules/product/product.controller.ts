import {
  Request,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { USER_TYPES } from 'src/types';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req: { user: { id: string } },
  ) {
    return this.productService.create(createProductDto, files, req.user.id);
  }

  @Patch(':id')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req: { user: { id: string } },
  ) {
    return this.productService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  @Roles(USER_TYPES.SELLER, USER_TYPES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  remove(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.productService.remove(id);
  }
}
