import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { File } from 'src/types';

ConfigModule.forRoot();

@Injectable()
export class FilesService {
  async uploadPublicFile(dataBuffer: Buffer, filename: string): Promise<File> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.EC_AWS_PUBLIC_BUCKET_NAME ?? '',
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    const newFile = {
      key: uploadResult.Key,
      url: uploadResult.Location,
    };
    return newFile;
  }

  async deletePublicFile(fileKey: string): Promise<boolean> {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.EC_AWS_PUBLIC_BUCKET_NAME ?? '',
        Key: fileKey,
      })
      .promise();
    return true;
  }
}
