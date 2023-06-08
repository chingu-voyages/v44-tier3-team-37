import { NextApiRequest, NextApiResponse } from "next";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

function getKey(url: string) {
  // key is everything after the amazonaws.com domain
  const key = url.replace(
    `https://${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com/`,
    ""
  );
  return key;
}

const client = new S3Client({
  region: process.env.S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY || "",
    secretAccessKey: process.env.S3_UPLOAD_SECRET || "",
  },
});

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    // https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html
    const command = new GetObjectCommand({
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: getKey(req.body.imageUrl),
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating signed URL" });
  }
}
