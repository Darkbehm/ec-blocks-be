import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { Store, StoreSchema } from '../store/schemas/store.schema';

@Module({
  imports: [
    UserModule,
    StoreModule,
    MongooseModule.forFeature([
      { name: Page.name, schema: PageSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
