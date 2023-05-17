import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isOrg } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        isOrganization: isOrg ? "ORG" : "USER",
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
