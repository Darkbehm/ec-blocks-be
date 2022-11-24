import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { StoreDocument } from 'src/types';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly StoreModel: Model<StoreDocument>,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
    files: { favIcon: [Express.Multer.File]; logo: [Express.Multer.File] },
  ): Promise<StoreDocument> {
    const newStore = { ...createStoreDto, favIcon: {}, logo: {} };

    const { favIcon, logo } = files;

    newStore.favIcon = await this.filesService.uploadPublicFile(
      favIcon[0].buffer,
      favIcon[0].originalname,
    );

    newStore.logo = await this.filesService.uploadPublicFile(
      logo[0].buffer,
      logo[0].originalname,
    );

    return this.StoreModel.create(newStore);
  }

  findAll() {
    return this.StoreModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
