import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
