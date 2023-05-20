import { Plus_Jakarta_Sans } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./Layout.module.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${font.className} ${styles.layout}`}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
