import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { BoldBtn } from "@/components/Buttons/Buttons";

function Header() {
  const { data: session } = useSession();

  const handleClick = () => {
    console.log("handleClick");
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <header className={styles.header}>
      <h1>Image Vault</h1>
      <nav>
        <ul>
          <li>
            <BoldBtn onClick={handleClick}>
              {session ? "Sign Out" : "Sign In"}
            </BoldBtn>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
