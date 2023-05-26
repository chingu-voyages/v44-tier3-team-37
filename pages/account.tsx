import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import type {
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

import styles from "@/styles/Account.module.css";
import {
  Btn,
  WarningBtn,
  OutlineWarningBtn,
} from "@/components/Buttons/Buttons";

export default function Account({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [orgName, setOrgName] = useState(data?.organization?.orgName);
  const [orgDesc, setOrgDesc] = useState(data?.organization?.orgDesc);

  const [updatedOrgName, setUpdatedOrgName] = useState(
    data?.organization?.orgName
  );
  const [updatedOrgDesc, setUpdatedOrgDesc] = useState(
    data?.organization?.orgDesc
  );

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setOrgName(updatedOrgName);
    setOrgDesc(updatedOrgDesc);
    setIsEditing(false);
    console.log(updatedOrgName, updatedOrgDesc);
    // try {
    //   const body = { orgName, orgDesc };
    //   await fetch(`/api/onboarding`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
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
    return <OutlineWarningBtn>Delete Account</OutlineWarningBtn>;
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
          <OutlineWarningBtn>Delete Account</OutlineWarningBtn>
        ) : isEditing ? (
          <form onSubmit={handleForm} className={styles.container}>
            <label htmlFor="name">Organization name</label>
            <input
              id="name"
              onChange={(e) => setUpdatedOrgName(e.target.value)}
              value={updatedOrgName}
              type="text"
            />
            <label htmlFor="desc">Tell us about your organization</label>
            <textarea
              onChange={(e) => setUpdatedOrgDesc(e.target.value)}
              value={updatedOrgDesc}
              name="desc"
              id=""
              cols={30}
              rows={8}
            ></textarea>
            <div className={styles.btnContainer}>
              <WarningBtn onClick={() => setIsEditing(false)}>
                Cancel
              </WarningBtn>
              <Btn type="submit" disabled={!updatedOrgName || !updatedOrgDesc}>
                Update
              </Btn>
            </div>
          </form>
        ) : (
          <div className={styles.container}>
            <h2>{orgName}</h2>
            <p>{orgDesc}</p>
            <div className={styles.btnContainer}>
              <OutlineWarningBtn>Delete Account</OutlineWarningBtn>
              <Btn onClick={() => setIsEditing(true)}>Update</Btn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type AccountData = {
  organization?: {
    orgName: string;
    orgDesc: string;
    orgCollectionLength?: number;
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
    console.log(data);
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
