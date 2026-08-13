import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2 } from "@/lib/storage/r2";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

const R2_BUCKET_NAME = getRequiredEnv("R2_BUCKET_NAME");

export class StorageService {
  constructor(
    private readonly client: S3Client = r2,
    private readonly bucket: string = R2_BUCKET_NAME,
  ) {}

  async uploadFile(input: {
    key: string;
    body: Buffer;
    contentType: string;
  }): Promise<{ key: string }> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType,
      }),
    );

    return { key: input.key };
  }

  async deleteFile(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async downloadFile(key: string): Promise<Buffer> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );

    if (!response.Body) {
      throw new Error(`GetObject returned an empty body for key: ${key}`);
    }

    return Buffer.from(await response.Body.transformToByteArray());
  }

  async getSignedUrl(
    key: string,
    expiresIn = 300,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, {
      expiresIn,
    });
  }
}

export const storageService = new StorageService();