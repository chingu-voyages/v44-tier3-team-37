import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import AllImages from "../components/AllImages/AllImages";
import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/oneImage.module.css";

import s from "@/styles/Home.module.css";

const OneImage = () => {
  // For react lightbox
  const [open, setOpen] = React.useState(false);

  // Get creation by id
  const params = useParams();
  const id = params.id;

  //fill the heart
  const [color, setColor] = useState("none");

  return (
    <>
      <h1>Titre</h1>
      <svg
        fill={color}
        onClick={() => {
          setColor("#000000");
        }}
        xmlns="http://www.w3.org/2000/svg"
        className={styles.favoriteIcon}
        width="23"
        height="23"
        viewBox="0 0 24 24"
        stroke="#6eadf4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>

      <div className={styles.allImageDetailsPage}>
        <div className={styles.imagePresentation}>
          <img
            className={styles.imagePicture}
            src="https://picsum.photos/id/12/192/200"
          />
          <div className={styles.imageDetails}>
            <h2 className={styles.imageDetailsTitle}>Titre</h2>
            <h4>Organization</h4>
            <p className={styles.imageDetailsDescription}>Date</p>
            <p className={styles.imageDetailsDescription}>Location</p>
            <p className={styles.imageDetailsDescription}>Description</p>
          </div>
        </div>
      </div>

      <p>Similar images</p>
      <button type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: "https://picsum.photos/id/13/192/200" },
          { src: "https://picsum.photos/id/11/192/200" },
          { src: "https://picsum.photos/id/12/192/200" },
        ]}
      />

      {/* <div className="middle-div-min">
        <div className="all-object-details-page">
          <div className="creation-presentation">
            <img
              className="creation-picture"
              src={image.img}
              alt={image.title}
            />
            <div className="creation-details">
              <h2 className="creation-details-title">{image.title}</h2>
              <p className="creation-details-description">
                {image.description}
              </p>
              <h4>Organization: {image.organization}</h4>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OneImage;
