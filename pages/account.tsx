import { useState } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import {
  Btn,
  WarningBtn,
  OutlineWarningBtn,
} from "@/components/Buttons/Buttons";

export default function Account({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const orgImagesTotal = data?.organization?.orgCollectionLength;
  const [orgName, setOrgName] = useState(data?.organization?.orgName);
  const [orgDesc, setOrgDesc] = useState(data?.organization?.orgDesc);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedOrgName, setUpdatedOrgName] = useState(
    data?.organization?.orgName
  );
  const [updatedOrgDesc, setUpdatedOrgDesc] = useState(
    data?.organization?.orgDesc
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { updatedOrgName, updatedOrgDesc };
      setIsLoading(true);
      await fetch(`/api/account/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setOrgName(updatedOrgName);
      setOrgDesc(updatedOrgDesc);
      setIsLoading(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { orgName };
      await fetch(`/api/account/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    signIn();
  };

  if (!data) {
    return (
      <>
        <h2>Error</h2>
        <Link href="/">Return to homepage</Link>
      </>
    );
  }
  if (data.session.user.role == "USER") {
    return (
      <OutlineWarningBtn onClick={deleteUser}>Delete Account</OutlineWarningBtn>
    );
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
        <link rel="icon" href="/image-vault-logo-dall-e.png" />
      </Head>
      <div className={styles.account}>
        {data.session.user.role != "ORG" ? (
          <OutlineWarningBtn onClick={deleteUser}>
            Delete Account
          </OutlineWarningBtn>
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
              id="desc"
              cols={30}
              rows={8}
            ></textarea>
            <div className={styles.btnContainer}>
              <WarningBtn onClick={() => setIsEditing(false)}>
                Cancel
              </WarningBtn>
              <Btn
                type="submit"
                disabled={
                  !updatedOrgName ||
                  !updatedOrgDesc ||
                  (updatedOrgName == orgName && updatedOrgDesc == orgDesc) ||
                  isLoading
                }
              >
                Update
              </Btn>
            </div>
          </form>
        ) : (
          <div className={styles.container}>
            {data?.organization?.banner ? (
              <div className={styles.imageContainer}>
                <img
                  src={data?.organization?.banner}
                  alt={`${orgName} banner`}
                />
              </div>
            ) : null}
            <h2>{orgName}</h2>
            <p>{orgDesc}</p>
            <p className={styles.emphasis}>
              {orgImagesTotal === 0
                ? "No images"
                : orgImagesTotal == 1
                ? "1 image"
                : `${orgImagesTotal} images`}{" "}
              in collection
            </p>
            <div className={styles.btnContainer}>
              <OutlineWarningBtn onClick={deleteUser}>
                Delete Account
              </OutlineWarningBtn>
              <Btn onClick={() => setIsEditing(true)}>Update</Btn>
            </div>
          </div>
        )}
      </div>
      {isLoading ? <LoadingSpinner /> : null}
    </>
  );
}

type AccountData = {
  organization?: {
    orgName: string;
    orgDesc: string;
    orgCollectionLength?: number;
    banner?: string;
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
        destination: "api/auth/signin",
      },
    };
  }

  // if we have a session with user role - return session
  if (session.user.role == "USER") {
    const data: AccountData = {
      session: session,
    };
    return {
      props: {
        data,
      },
    };
  }

  const org = await prisma.organization.findFirst({
    where: {
      user: {
        id: session.user.id,
      },
    },
    include: {
      images: true,
    },
  });

  // if we have a session with org role and organization object - return org data and session
  if (org) {
    const data: AccountData = {
      organization: {
        orgName: org.name,
        orgDesc: org.description,
        orgCollectionLength: org.images.length || 0,
        banner: org.banner,
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
