import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orgName, orgDesc } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // update org account data
    const updateOrg = await prisma.organization.update({
      where: {
        userId: session.user?.id,
      },
      data: {
        name: orgName,
        description: orgDesc,
      },
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
