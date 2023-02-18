import * as AWS from "aws-sdk";
import { UploadedFile } from "express-fileupload";
import * as dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

const uploadImage = async (file: UploadedFile) => {
  const fileContent = Buffer.from(file.data as ArrayBuffer);
  const params = {
    Bucket: process.env.BUCKET,
    Body: fileContent,
    Key: file.name,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  const uploadImage = await s3.upload(params).promise();
  if (uploadImage.Location) {
    return uploadImage.Location;
  }
  return false;
};

export default uploadImage;
