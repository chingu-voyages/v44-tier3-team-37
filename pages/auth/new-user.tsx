import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewUser() {
  const router = useRouter();
  const [isOrg, setIsOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgDesc, setOrgDesc] = useState("");

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { isOrg, orgName, orgDesc };
      await fetch(`/api/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Welcome | Image Vault</title>
        <meta
          name="description"
          content="Find and share images with the world."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Image Vault!</h1>
        <form onSubmit={handleForm}>
          <label htmlFor="role">Are you an organization?</label>
          <input
            id="role"
            onChange={() => setIsOrg(!isOrg)}
            checked={isOrg}
            type="checkbox"
          />
          {isOrg ? (
            <>
              <label htmlFor="name">Organization name</label>
              <input
                id="name"
                onChange={(e) => setOrgName(e.target.value)}
                value={orgName}
                type="text"
              />
              <label htmlFor="desc">Tell us about your organization</label>
              <textarea
                onChange={(e) => setOrgDesc(e.target.value)}
                value={orgDesc}
                name="desc"
                id=""
                cols={30}
                rows={10}
              ></textarea>
            </>
          ) : null}
          <button>Submit</button>
        </form>
      </main>
    </>
  );
}
