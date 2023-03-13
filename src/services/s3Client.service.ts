import * as AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import * as dotenv from "dotenv";
import * as QRCode from "qrcode";

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

const uploadImage = async (folder: string, file: UploadedFile) => {
  console.log('file =>', file)
  const fileContent = Buffer.from(file?.data as ArrayBuffer);
  const fileName = `${Date.now()}-${file.name}`;
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKET,
    Body: fileContent,
    Key: `${folder}/${fileName}`,
    ContentType: file.mime,
  };

  const uploadImage = await s3.upload(params).promise();
  return uploadImage.Location;
};

export const generateQR = async (id: string) => {
  const QR = await QRCode.toDataURL(id);

  const imageData = QR.split(',')[1];

  const buffer = Buffer.from(imageData, 'base64');

  const fileName = `${id}.png`

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKET,
    Body: buffer,
    Key: `QR/${fileName}`,
  };
  const uploadImage = await s3.upload(params).promise();
  return uploadImage.Location;
}

export default uploadImage;
