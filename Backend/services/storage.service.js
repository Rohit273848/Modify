import dotenv from 'dotenv';
dotenv.config();

import ImageKit from '@imagekit/nodejs';
import { toFile } from '@imagekit/nodejs';
import { model } from 'mongoose';

console.log("SERVICE KEY:", process.env.IMAGEKIT_PRIVATE_KEY);

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile({buffer, filename, folder = ""}) {


  const file = await client.files.upload({
    file: await ImageKit.toFile(Buffer.from(buffer)),
    fileName: filename,
    folder
  });

 



  return file
}

export default {
  uploadFile
};