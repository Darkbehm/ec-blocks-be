import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FilesModule } from '../files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UserModule } from '../user/user.module';
import { Store, StoreSchema } from '../store/schemas/store.schema';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    UserModule,
    StoreModule,
    FilesModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
