import * as AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import * as dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

const s3 = new AWS.S3({ region: process.env.REGION });

const uploadImage = async (folder, file: UploadedFile) => {
  console.log("file =>", file);
  const fileContent = Buffer.from(file.data as ArrayBuffer);
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKET,
    Body: fileContent,
    Key: `${folder}${file.name}`,
    ContentType: file.mimetype,
    // ACL: "public-read",
  };

  console.log(params);
  const uploadImage = await s3.upload(params).promise();
  if (uploadImage.Location) {
    return uploadImage.Location;
  }
  return false;
};

export default uploadImage;
