import { ReactNode } from "react";
import { Navbar, Sidebar } from "../components/ui";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
