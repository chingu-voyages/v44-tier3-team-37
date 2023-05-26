import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isOrg, orgName, orgDesc } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // update user role
    if (isOrg) {
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
            },
          },
        },
      });
    } else {
      const updateUser = await prisma.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          role: "USER",
        },
      });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
