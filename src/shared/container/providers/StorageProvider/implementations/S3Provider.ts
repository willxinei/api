import upload from "@config/upload";
import fs from "fs";
import path from "path";
import aws, { S3 } from "aws-sdk";
import IStorageProvider from "../models/IStorageProviders";

class S3StoreageProvider implements IStorageProvider {
   private client: S3;

   constructor() {
      this.client = new aws.S3({
         region: "us-east-2",
      });
   }

   public async saveFile(file: string): Promise<string> {
      const originalPah = path.resolve(upload.tmpFolder, file);

      const fileContent = await fs.promises.readFile(originalPah, {
         encoding: "utf-8",
      });

      this.client
         .putObject({
            Bucket: "app-com",
            Key: file,
            ACL: "public-read",
            Body: fileContent,
         })
         .promise();

      return file;
   }

   public async deleteFile(file: string): Promise<void> {
      await this.client
         .deleteObject({
            Bucket: "app-com",
            Key: file,
         })
         .promise();
   }
}

export default S3StoreageProvider;
