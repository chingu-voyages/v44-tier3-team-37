import styles from "../styles/About.module.css";
import React from "react";

import s from "@/styles/Home.module.css";

const About: React.FC = () => {
  return (
    <>
      <h1>About</h1>
      <div className={styles.about}>
        <p>
          Welcome to Image Vault, a place for museums, archives, and cultural
          organizations to share their collections. Whether you&apos;re
          searching for historical gems or contemporary visual content, Image
          Vault offers an extensive collection that is entirely free of rights.
        </p>
        <p>
          At Image Vault, we understand the importance of visual media in
          conveying messages, preserving memories, and enhancing creative
          projects. Our platform is designed to provide a user-friendly and
          secure environment, ensuring a seamless experience for both content
          creators, organizations and consumers.
        </p>
        <p>
          Explore our vast library of images and uncover a treasure trove of
          captivating visuals. From vintage photographs capturing significant
          moments in history to stunning landscapes, artistic creations, and
          everything in between, Image Vault caters to diverse interests and
          themes.
        </p>
        <p>
          If you&apos;re a content creator looking to share your work with the
          world, Image Vault provides a convenient platform to showcase your
          talent. Upload your own images, photos, videos, or archives, and
          contribute to our ever-expanding collection. With our commitment to
          free rights, you can share your creations without worrying about
          copyright restrictions.
        </p>
        <p>
          We believe in promoting the spirit of collaboration and knowledge
          sharing. Our community of users consists of passionate individuals,
          researchers, students, and enthusiasts who contribute to the
          preservation and accessibility of visual content. Join our community
          today and be a part of this exciting endeavor.
        </p>
        <p>
          To ensure a smooth and efficient experience, Image Vault employs
          advanced search capabilities, allowing you to quickly find the content
          you need. Browse through various categories, apply filters, or use
          keywords to pinpoint specific images, photos, videos, or archives.
        </p>
        <p>
          Image Vault values the privacy and security of its users. We have
          implemented robust measures to safeguard your personal information and
          ensure that your uploads remain protected. Your data is encrypted and
          stored securely, giving you peace of mind as you engage with our
          platform.
        </p>
        <p>
          So, whether you&apos;re a history buff, a creative professional, or
          simply someone in search of captivating visuals, Image Vault is the
          go-to destination for all your visual content needs. Start exploring
          today and unlock a world of free, rights-free imagery at your
          fingertips.
        </p>
      </div>
    </>
  );
};

export default About;
