import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useS3Upload } from "next-s3-upload";
import styles from "@/styles/New-user.module.css";
import { Btn } from "@/components/Buttons/Buttons";
import Dropzone from "@/components/Upload/Dropzone";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

export default function NewUser() {
  const { data: session, update } = useSession();
  const router = useRouter();

  // banner image
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState("");
  const { uploadToS3 } = useS3Upload();

  // form data
  const [isOrg, setIsOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgDesc, setOrgDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // upload image to S3 bucket
      const { url } = await uploadToS3(files[0]);
      const body = { isOrg, url, orgName, orgDesc };
      await fetch(`/api/account/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await update({ role: isOrg ? "ORG" : "USER" });
      await router.push("/");
    } catch (error) {
      setIsLoading(false);
      alert("Error creating account.");
      setFiles([]);
      setPreview("");
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Welcome | Image Vault</title>
        <meta
          name="description"
          content="Find and collect historical images."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/image-vault-logo-dall-e.png" />
      </Head>
      <div className={styles.onboarding}>
        <h2>Welcome to Image Vault</h2>
        <form onSubmit={handleForm}>
          <div className={styles.radio}>
            <label>
              <input
                type="radio"
                name="radio"
                onChange={() => setIsOrg(false)}
                checked={!isOrg}
              />
              <span>User</span>
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                onChange={() => setIsOrg(true)}
                checked={isOrg}
              />
              <span>Organization</span>
            </label>
          </div>

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
                id="desc"
                cols={30}
                rows={8}
              ></textarea>
              <label htmlFor="banner">Banner Image [120x680]</label>
              <div className={styles.dropZone}>
                <Dropzone
                  setFiles={setFiles}
                  setPreview={setPreview}
                  preview={preview}
                />
              </div>
            </>
          ) : null}
          <Btn
            type="submit"
            disabled={
              isLoading ||
              (isOrg && (!orgName || !orgDesc)) ||
              (files.length > 0 && !preview)
            }
          >
            {isOrg ? "Submit" : "Continue"}
          </Btn>
        </form>
        {isLoading ? <LoadingSpinner /> : null}
      </div>
    </>
  );
}
