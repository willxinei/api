import multer, { StorageEngine } from "multer";
import path from "path";
import crypt from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadsConfg {
   driver: "s3" | "disk";
   tmpFolder: string;
   UploadFolder: string;

   multer: {
      storage: StorageEngine;
   };

   config: {
      disk: {
         storage: {};
      };
   };
}
export default {
   driver: process.env.STORAGE_DRIVER,

   tmpFolder,
   UploadFolder: path.resolve(tmpFolder, "uploads"),

   multer: {
      storage: multer.diskStorage({
         destination: tmpFolder,
         filename(request, file, callback) {
            const fileHash = crypt.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
         },
      }),
   },

   config: {
      disk: {},
   },
} as IUploadsConfg;
