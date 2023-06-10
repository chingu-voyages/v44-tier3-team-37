import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isOrg, url, orgName, orgDesc } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    try {
      if (isOrg) {
        // update user role and add org data
        const updateUser = await prisma.user.update({
          where: {
            id: session.user?.id,
          },
          data: {
            role: "ORG",
            organization: {
              create: {
                name: orgName,
                description: orgDesc,
                banner: url,
              },
            },
          },
        });
      } else {
        // update user role
        const updateUser = await prisma.user.update({
          where: {
            id: session.user?.id,
          },
          data: {
            role: "USER",
          },
        });
      }
      res.status(200).send({ message: "Successfully created an account" });
    } catch (error) {
      res.status(405).send(error);
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
