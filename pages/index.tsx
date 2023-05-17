import Head from "next/head";
import { Inter } from "next/font/google";
import s from "@/styles/Home.module.css";
import LoginBtn from "@/components/login-btn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  // if user role is NONE, route to onboarding form
  if (session?.user?.role == "NONE") {
    router.push("/auth/new-user");
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${s.main} ${inter.className}`}>
        <h1 className={inter.className}>Home</h1>
        <LoginBtn />
        {session?.user ? (
          <p>You are signed in as a {session.user.role}</p>
        ) : null}
      </main>
    </>
  );
}
