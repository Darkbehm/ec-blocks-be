import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument } from 'src/models/file';
import { PublicFile } from './schemas/public-file.schema';

ConfigModule.forRoot();

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(PublicFile.name)
    private readonly filesModel: Model<FileDocument>,
  ) {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<FileDocument> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? '',
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.filesModel.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return newFile;
  }

  async deletePublicFile(fileId: string): Promise<boolean> {
    const file = await this.filesModel.findOne({ id: fileId });
    if (!file) return false;
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? '',
        Key: file.key,
      })
      .promise();

    await this.filesModel.deleteOne({ id: fileId });
    return true;
  }
}
