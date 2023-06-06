import styles from "./Footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.upPartFooter}>
        <div className={styles.firstPartFooter}>
          <div className={styles.logoAndName}>
            <img
              src="https://res.cloudinary.com/dsioshcio/image/upload/v1686075174/image-vault-logo-dall-e_rouaim.png"
              className={styles.logo}
              alt="logo"
            />
            <h2>
              <Link href="/">Image Vault</Link>
            </h2>
          </div>
          <p>
            Developed as part of an agile process with{" "}
            <a href="https://github.com/chingu-voyages">Chingu voyages</a>
          </p>
        </div>
        <div className={styles.firstPartFooter}>
          <Link href="/about">About</Link>
          <a href="https://github.com/chingu-voyages/v44-tier3-team-37">
            Socials
          </a>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/dsioshcio/image/upload/v1686075697/Line_ges7yp.png"
        alt="line"
        className={styles.line}
      />
      <div>
        Copyright © 2023 <a href="https://github.com/dejmedus">@dejmedus</a>,{" "}
        <a href="https://github.com/FlapShatner">@FlapShatner</a>,{" "}
        <a href="https://github.com/jameswonlee">@jameswonlee</a>,{" "}
        <a href="https://github.com/LucileTech">@LucileTech</a>. All Rights
        Reserved.
      </div>
    </footer>
  );
}

export default Footer;
