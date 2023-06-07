import { useState, useRef, use, useEffect } from "react";
import prisma from "@/lib/prisma";
import { useS3Upload } from "next-s3-upload";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/router';

import s from "../upload/Upload.module.css";
import { Btn, BoldBtn } from "@/components/Buttons/Buttons";
import Dropzone from "@/components/Upload/Dropzone";
import Tags from "@/components/Upload/Tags";
import { useSession } from "next-auth/react";

import { Loader } from "@/components/Upload/Loader";
import { authOptions } from "../api/auth/[...nextauth]";

export type Tag = {
  name: string;
  id: string;
};

export type TagWithImages = {
  name: string;
  id: string;
  imageIds: string[];
};

type Image = {
  id: string,
  uploaded_at: string,
  title: string,
  location: string,
  description: string,
  date: string,
  alt: string,
  url: string,
  tagIds: string,
  organizationId: string,
  userId: string
}

interface Props {
  orgId: string,
  orgImages: Image[]
}

const Update: React.FC<Props> = ({ orgId, orgImages }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { imageId } = router.query;
  const image = orgImages.find(image => image.id.toString() === imageId?.toString());

  const [allTags, setAllTags] = useState<TagWithImages[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const { uploadToS3 } = useS3Upload();
  const [preview, setPreview] = useState("");
  const [btnState, setBtnState] = useState<
    "loading" | "error" | "success" | null
  >(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const altRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/tag")
      .then((res) => res.json())
      .then((data) => setAllTags(data));
  }, [tags]);

  useEffect(() => {
    if (image) {
      if (titleRef.current) titleRef.current.value = image.title;
      if (locationRef.current) locationRef.current.value = image.location;
      if (dateRef.current) dateRef.current.value = new Date(image.date).toLocaleDateString('en-CA');
      if (descRef.current) descRef.current.value = image.description;
      if (descRef.current) descRef.current.value = image.description;
      if (altRef.current) altRef.current.value = image.alt;
      // setTags(allTags.filter((tag) => image.tagIds.includes(tag.id)));
    }
  }, [image]);

  const clearForm = function () {
    setPreview("");
    setFiles([]);
    setTags([]);
    titleRef.current ? (titleRef.current.value = "") : null;
    locationRef.current ? (locationRef.current.value = "") : null;
    dateRef.current ? (dateRef.current.value = "") : null;
    descRef.current ? (descRef.current.value = "") : null;
    altRef.current ? (altRef.current.value = "") : null;
  };

  const deleteImage = async () => {
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          imageId: image?.id
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = res.status;
      const data = await res.json();
      if (status === 200) {
        router.push('/');
        clearForm();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setBtnState("loading");
    try {
      const res = await fetch("/api/image", {
        method: "PUT",
        body: JSON.stringify({
          id: image?.id,
          orgId: orgId,
          title: titleRef.current?.value,
          location: locationRef.current?.value,
          date: dateRef.current?.value,
          description: descRef.current?.value,
          alt: altRef.current?.value,
          url: image?.url,
          tagIds: tags.map((tag) => tag.id),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = res.status;
      const data = await res.json();
      if (status === 200) {
        setBtnState("success");
      }
      console.log(data);
    } catch (error) {
      setBtnState("error");
      console.log(error);
    }
  };

  return (
    <div className={s.upload}>
      <form>
        <h2>Update Image</h2>
        <label htmlFor="title">Image title</label>
        <input ref={titleRef} type="text" name="title" id="title" />
        <div className={s.inputGroup}>
          <div className={s.location}>
            <label htmlFor="location">Location</label>
            <input
              ref={locationRef}
              type="text"
              name="location"
              id="location"
            />
          </div>
          <div className={s.date}>
            <label htmlFor="date">Date</label>
            <input ref={dateRef} type="date" name="date" id="date" />
          </div>
        </div>
        <label htmlFor="description">Description</label>
        <textarea ref={descRef} name="description" id="description" />
        <label htmlFor="alt">Image alt text</label>
        <input ref={altRef} type="text" name="alt" id="alt" />
        <Tags tags={tags} setTags={setTags} allTags={allTags} />
        <p>
          {btnState === "error"
            ? "Unable to update image details. Please try again"
            : btnState === "success"
              ? "Image details updated successfully!"
              : null}
        </p>
        <div className={s.btnGroup}>
          <Btn onClick={() => deleteImage()}>Delete Image</Btn>
          <BoldBtn onClick={handleSubmit}>
            {btnState === "loading" ? <Loader size="16" /> : null}
            {btnState === "error" ? "Upload" : null}
            {btnState === "success" ? "Success!" : null}
            {btnState === null ? "Update" : null}
          </BoldBtn>
        </div>
      </form>
    </div>
  );
}

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

  if (!session) return { props: {} };

  const org = await prisma.organization.findFirst({
    where: {
      user: {
        id: session.user.id,
      },
    },
    include: {
      images: true
    }
  });
  const orgId = org?.id;
  const orgImages = org?.images;

  return {
    props: {
      orgId,
      orgImages
    },
  };
}

export default Update;
