import * as AWS from "aws-sdk";
import * as fs from "fs";
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

const uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: process.env.BUCKET,
    Body: fileStream,
    Key: file.filename,
  };
  const uploadImage = await s3.upload(params).promise();
  return uploadImage.Location;
};

export default uploadImage;
