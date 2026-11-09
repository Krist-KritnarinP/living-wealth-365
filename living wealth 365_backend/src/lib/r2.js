import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = (
  process.env.R2_PUBLIC_DOMAIN || 'https://pub-10dc92b49894448a9fe11f81ccc1e577.r2.dev'
).replace(/\/$/, '');

export const isR2Configured = Boolean(
  R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET_NAME
);

let r2Client = null;

if (isR2Configured) {
  try {
    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
    console.log(`[Cloudflare R2] Connected: bucket "${R2_BUCKET_NAME}" ready.`);
  } catch (err) {
    console.error('[Cloudflare R2 Client Init Error]:', err);
  }
}

/**
 * Upload a file buffer directly to Cloudflare R2
 * @param {Object} params
 * @param {Buffer} params.buffer - File buffer
 * @param {string} params.filename - Storage key/filename in bucket
 * @param {string} params.mimetype - MIME type of the file
 * @returns {Promise<{ url: string, key: string }>}
 */
export async function uploadToR2({ buffer, filename, mimetype }) {
  if (!isR2Configured || !r2Client) {
    throw new Error('Cloudflare R2 is not configured in environment variables');
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
  });

  await r2Client.send(command);

  const publicUrl = `${R2_PUBLIC_DOMAIN}/${filename}`;
  return {
    url: publicUrl,
    key: filename,
    bucket: R2_BUCKET_NAME,
  };
}

/**
 * Delete a file from Cloudflare R2
 * @param {string} filename - Storage key/filename to delete
 */
export async function deleteFromR2(filename) {
  if (!isR2Configured || !r2Client) return;

  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: filename,
    });
    await r2Client.send(command);
  } catch (err) {
    console.error('[Cloudflare R2 Delete Error]:', err);
  }
}

/**
 * List all objects and compute exact real storage size directly from Cloudflare R2
 */
export async function getR2StorageUsage() {
  if (!isR2Configured || !r2Client) {
    return {
      storage: 'LOCAL',
      totalBytes: 0,
      totalMB: 0,
      totalCount: 0,
      objects: [],
    };
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      MaxKeys: 1000,
    });

    const response = await r2Client.send(command);
    const contents = response.Contents || [];

    const totalBytes = contents.reduce((sum, item) => sum + (item.Size || 0), 0);
    const objects = contents.map((item) => ({
      key: item.Key,
      filename: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      url: `${R2_PUBLIC_DOMAIN}/${item.Key}`,
    }));

    return {
      storage: 'CLOUDFLARE_R2',
      bucket: R2_BUCKET_NAME,
      totalBytes,
      totalMB: Number((totalBytes / (1024 * 1024)).toFixed(3)),
      totalCount: objects.length,
      objects,
    };
  } catch (err) {
    console.error('[Cloudflare R2 ListObjects Error]:', err);
    throw err;
  }
}

export { r2Client, R2_BUCKET_NAME, R2_PUBLIC_DOMAIN };
