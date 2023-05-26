import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { updatedOrgName, updatedOrgDesc } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    try {
      // update org account data
      const updateOrg = await prisma.organization.update({
        where: {
          userId: session.user?.id,
        },
        data: {
          name: updatedOrgName,
          description: updatedOrgDesc,
        },
      });

      res.status(200).send({ message: "Successfully updated account data" });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
