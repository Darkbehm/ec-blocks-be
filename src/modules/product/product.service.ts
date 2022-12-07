import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { FilesService } from '../files/files.service';
import { ProductDocument } from 'src/types/product';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { StoreDocument } from 'src/types';
import { Store } from '../store/schemas/store.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
    private readonly fileService: FilesService,
    @InjectModel(Store.name) private readonly StoreModel: Model<StoreDocument>,
  ) {}

  async findAll() {
    try {
      return await this.ProductModel.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.ProductModel.findById(id).exec();
    } catch (error) {
      return error;
    }
  }

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
    user: string,
  ): Promise<any> {
    try {
      const store = await this.StoreModel.findOne({ owner: user });

      const newProduct: Product = {
        ...createProductDto,
        store: store?._id,
        images: [],
      };

      await Promise.all(
        files.map(async (file) => {
          const fileUploaded = await this.fileService.uploadPublicFile(
            file.buffer,
            file.originalname,
          );
          newProduct.images.push(fileUploaded);
        }),
      );
      return await this.ProductModel.create(newProduct);
    } catch (error) {
      return error;
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
    user: string,
  ): Promise<any> {
    try {
      const actualProduct = await this.ProductModel.findById(id);

      const { name, description, price, hasImagesChange } = updateProductDto;

      const newProduct = {
        name,
        description,
        price,
        images: actualProduct?.images,
      };

      if (hasImagesChange) {
        const newImages: any = [];
        await Promise.all(
          actualProduct!.images.map(async (img) => {
            await this.fileService.deletePublicFile(img.key);
          }),
        );

        await Promise.all(
          files.map(async (file) => {
            const fileUploaded = await this.fileService.uploadPublicFile(
              file.buffer,
              file.originalname,
            );

            newImages.push(fileUploaded);
          }),
        );

        newProduct.images = newImages;

        return await this.ProductModel.findByIdAndUpdate(id, newProduct, {
          new: true,
        });
      }
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, user: string) {
    try {
      return await this.ProductModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
