import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { BoldBtn } from "@/components/Buttons/Buttons";

function Header() {
  const { data: session } = useSession();
  const currentPath = usePathname();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoDisplay}>
        <img
          src="https://res.cloudinary.com/dsioshcio/image/upload/v1686075174/image-vault-logo-dall-e_rouaim.png"
          className={styles.logo}
          alt="logo"
        />
        <h1>
          <Link href="/">Image Vault</Link>
        </h1>
      </div>
      <nav>
        <ul>
          {session && currentPath !== "/auth/new-user" ? (
            <>
              {session.user.role == "USER" ? (
                <li>
                  <Link href="/my-collection">Collection</Link>
                </li>
              ) : null}
              <li>
                <Link href="/account">Account</Link>
              </li>
            </>
          ) : null}

          {currentPath !== "/auth/new-user" ? (
            <li>
              <BoldBtn onClick={handleClick}>
                {session ? "Sign Out" : "Sign In"}
              </BoldBtn>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
