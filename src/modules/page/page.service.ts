import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageDocument } from 'src/types/page';
import { Page } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { Store } from '../store/schemas/store.schema';
import { StoreDocument } from 'src/types';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private readonly PageModel: Model<PageDocument>,
    @InjectModel(Store.name) private readonly StoreModel: Model<StoreDocument>,
  ) {}

  async findAll() {
    try {
      return await this.PageModel.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.PageModel.findById(id).exec();
    } catch (error) {
      return error;
    }
  }

  async findAllByStore(user: string) {
    try {
      const store = await this.StoreModel.findOne({ owner: user });

      return await this.PageModel.find({ store: store?._id });
    } catch (error) {
      return error;
    }
  }

  async create(createPageDto: CreatePageDto, user: string): Promise<any> {
    try {
      const store = await this.StoreModel.findOne({ owner: user });

      const newPage: Page = {
        ...createPageDto,
        store: store?._id,
      };

      return await this.PageModel.create(newPage);
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    try {
      return await this.PageModel.findByIdAndUpdate(id, updatePageDto, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.PageModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
