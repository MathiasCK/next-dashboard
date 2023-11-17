import { ReactNode } from "react";
import { Navbar, Sidebar } from "../components/ui";
import styles from "./dashboard.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
