import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from './files.service';
import { FileSchema, PublicFile } from './schemas/public-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PublicFile.name, schema: FileSchema }]),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
