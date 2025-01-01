
import { Outlet } from "react-router-dom";
import NaviBar from "./NaviBar";
import { useEffect } from "react";

const Layout = () => {


  return (
    <div className="py-auto flex h-fit flex-col bg-white">
      <NaviBar />
      <Outlet />
    </div>
  );
};

export default Layout;
