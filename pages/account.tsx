import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
// import { useRouter } from "next/router";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

import styles from "@/styles/New-user.module.css";
import { Btn, WarningBtn } from "@/components/Buttons/Buttons";

export default function Account({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();

  const [orgName, setOrgName] = useState(data?.organization?.orgName);
  const [orgDesc, setOrgDesc] = useState(data?.organization?.orgDesc);

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { orgName, orgDesc };
      await fetch(`/api/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <>
        <h1>Error</h1>
        <Link href="/">Return to homepage</Link>
      </>
    );
  }
  if (data.session.user.role == "USER") {
    return <WarningBtn>Delete Account</WarningBtn>;
  }

  return (
    <>
      <Head>
        <title>Account | Image Vault</title>
        <meta
          name="description"
          content="Find and collect historical images."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.account}>
        {data.session.user.role != "ORG" ? (
          <WarningBtn>Delete Account</WarningBtn>
        ) : (
          <>
            <h1>{data.organization?.orgName}</h1>
            <p>{data.organization?.orgDesc}</p>
            <WarningBtn>Delete Account</WarningBtn>
          </>
        )}
      </div>
    </>
  );
}

type AccountData = {
  organization?: {
    orgName: string;
    orgDesc: string;
  };
  session: Session;
};

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
  authOptions: NextAuthOptions;
}) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      // if we do not have a session - send to signin page
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
  // if we have a session with user role - return session
  if (session.user.role == "USER") return { props: { session: session } };

  const org = await prisma.organization.findFirst({
    where: {
      user: {
        id: session.user.id,
      },
    },
  });

  // if we have a session with org role and organization object - return org data and session
  if (org) {
    const data: AccountData = {
      organization: {
        orgName: org.name,
        orgDesc: org.description,
      },
      session: session,
    };

    return {
      props: {
        data,
      },
    };
  } else {
    // if we have a session with ORG role, but no organization object - send to onboarding page
    return {
      redirect: {
        destination: "/auth/new-user",
      },
    };
  }
}
