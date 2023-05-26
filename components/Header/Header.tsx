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
      <h1>
        <Link href="/">Image Vault</Link>
      </h1>
      <nav>
        <ul>
          {session && currentPath !== "/auth/new-user" ? (
            <li>
              <Link href="/account">Account</Link>
            </li>
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
