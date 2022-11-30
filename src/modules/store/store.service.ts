import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { StoreDocument } from 'src/types';
import { errorResponseECBlocks } from 'src/types/response';
import { PAGE_LIMIT } from 'src/types/standars';
import { StoreDetails } from 'src/types/store';
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
    files: {
      favIcon: [Express.Multer.File];
      logo: [Express.Multer.File];
      bgImage: [Express.Multer.File];
    },
  ): Promise<StoreDetails | errorResponseECBlocks> {
    try {
      const actualStore = await this.StoreModel.findOne({
        owner: createStoreDto.owner,
      });

      if (actualStore)
        return {
          hasError: true,
          errorCode: 'ecb-0001',
          message: 'User already has a store',
          data: {
            actualStore: actualStore._id,
          },
        };

      const newStore = {
        ...createStoreDto,
        favIcon: {},
        logo: {},
        bgImage: {},
      };

      const { favIcon, logo, bgImage } = files;

      newStore.favIcon = await this.filesService.uploadPublicFile(
        favIcon[0].buffer,
        favIcon[0].originalname,
      );

      newStore.logo = await this.filesService.uploadPublicFile(
        logo[0].buffer,
        logo[0].originalname,
      );

      newStore.bgImage = await this.filesService.uploadPublicFile(
        bgImage[0].buffer,
        bgImage[0].originalname,
      );

      return this.StoreModel.create(newStore);
    } catch (error) {
      return {
        hasError: true,
        errorCode: 'ecb-0002',
        message: 'Error creating store',
        data: {
          error,
        },
      };
    }
  }

  async findAll(
    page: number,
  ): Promise<storesReturnType | errorResponseECBlocks> {
    try {
      const totalStores = await this.StoreModel.where('isDeleted')
        .ne(true)
        .countDocuments()
        .exec();
      const totalPages = Math.ceil(totalStores / PAGE_LIMIT);
      const skip =
        page <= 1
          ? 0
          : page > totalPages
          ? (totalPages - 1) * PAGE_LIMIT
          : (page - 1) * PAGE_LIMIT;

      const stores = await this.StoreModel.find()
        .where('isDeleted')
        .ne(true)
        .sort({ _id: 1 })
        .skip(skip)
        .limit(PAGE_LIMIT);

      const storesDetails: StoreDetails[] = stores.map((store) => {
        return {
          tittle: store.tittle,
          description: store.description,
          keyWords: store.keyWords,
          favIcon: store.favIcon,
          logo: store.logo,
          bgImage: store.bgImage,
        };
      });
      return {
        stores: storesDetails,
        totalPages: totalPages,
      };
    } catch (error) {
      return {
        hasError: true,
        errorCode: 'ecb-0003',
        message: 'Error getting stores',
        data: {
          error,
        },
      };
    }
  }

  async findOne(id: string): Promise<StoreDetails | errorResponseECBlocks> {
    try {
      const store = await this.StoreModel.findById(id)
        .where('isDeleted')
        .ne(true)
        .select({
          _id: 1,
          tittle: 1,
          description: 1,
          keyWords: 1,
          favIcon: 1,
          logo: 1,
          bgImage: 1,
        })
        .exec();
      if (store === null) {
        return {
          hasError: true,
          errorCode: 'ecb-0004',
          message: 'Store not found',
          data: {
            storeId: id,
          },
        };
      }
      return store;
    } catch (error) {
      return {
        hasError: true,
        errorCode: 'ecb-0005',
        message: 'Error getting store',
        data: {
          error,
        },
      };
    }
  }

  async update(
    id: string,
    updateStoreDto: UpdateStoreDto,
    files: {
      favIcon: [Express.Multer.File];
      logo: [Express.Multer.File];
      bgImage: [Express.Multer.File];
    },
    user: string,
  ): Promise<any> {
    try {
      const actualStore = await this.StoreModel.findById(id);

      if (actualStore === null) {
        return {
          hasError: true,
          errorCode: 'ecb-0006',
          message: 'Store not found',
          data: {
            storeId: id,
          },
        };
      }

      if (!(actualStore.owner.toString() === user)) {
        return {
          hasError: true,
          errorCode: 'ecb-0009',
          message: 'User is not the owner of the store',
          data: {
            storeId: id,
            user,
          },
        };
      }

      const {
        tittle,
        description,
        globalCss,
        globalJs,
        keyWords,
        hasLogoChange,
        hasFavIconChange,
        hasBgImageChange,
      } = updateStoreDto;

      const newStore = {
        tittle,
        description,
        globalCss,
        globalJs,
        keyWords,
        logo: actualStore.logo,
        favIcon: actualStore.favIcon,
        bgImage: actualStore.bgImage,
      };

      const { favIcon, logo, bgImage } = files;
      if (hasLogoChange) {
        const oldLogo = actualStore.logo.key;
        await this.filesService.deletePublicFile(oldLogo);
        const newLogo = await this.filesService.uploadPublicFile(
          logo[0].buffer,
          logo[0].originalname,
        );
        newStore.logo = newLogo;
      }
      if (hasFavIconChange) {
        const oldFavIcon = actualStore.favIcon.key;
        await this.filesService.deletePublicFile(oldFavIcon);
        const newFavIcon = await this.filesService.uploadPublicFile(
          favIcon[0].buffer,
          favIcon[0].originalname,
        );
        newStore.favIcon = newFavIcon;
      }
      if (hasBgImageChange) {
        const oldBgImage = actualStore.bgImage.key;
        await this.filesService.deletePublicFile(oldBgImage);
        const newBgImage = await this.filesService.uploadPublicFile(
          bgImage[0].buffer,
          bgImage[0].originalname,
        );
        newStore.bgImage = newBgImage;
      }

      return this.StoreModel.findByIdAndUpdate(id, newStore, {
        new: true,
      });
    } catch (error) {
      return {
        hasError: true,
        errorCode: 'ecb-0007',
        message: 'Error updating store',
        data: {
          error,
        },
      };
    }
  }

  async remove(id: string, user: string): Promise<errorResponseECBlocks> {
    try {
      const actualStore = await this.StoreModel.findById(id);
      if (actualStore === null) {
        return {
          hasError: true,
          errorCode: 'ecb-0006',
          message: 'Store not found',
          data: {
            storeId: id,
          },
        };
      }
      if (!(actualStore.owner.toString() === user)) {
        return {
          hasError: true,
          errorCode: 'ecb-0009',
          message: 'User is not the owner of the store',
          data: {
            storeId: id,
            user,
          },
        };
      }
      const wasDeleted = await this.StoreModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (wasDeleted === null) {
        throw new Error('Error deleting store');
      }
      return {
        hasError: false,
        errorCode: 'ecb-0000',
        message: 'Store deleted',
        data: {
          storeId: id,
        },
      };
    } catch (error) {
      return {
        hasError: true,
        errorCode: 'ecb-0008',
        message: 'Error deleting store',
        data: {
          error,
        },
      };
    }
  }
}

type storesReturnType = {
  totalPages: number;
  stores: StoreDetails[];
};
