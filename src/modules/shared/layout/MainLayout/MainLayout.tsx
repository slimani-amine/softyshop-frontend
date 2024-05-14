// import { PATH } from '@src/modules/auth/routes/paths';
import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useAnimation } from "./context/animationContext";
import { useLocation } from "react-router-dom";
// import { isAsExpression } from 'typescript';
// import { useNavigate } from 'react-router-dom';
// import { useAppSelector } from '../../store';
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  //const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);

  const menuRef = useRef<HTMLDivElement>(null);
  const { isAnimating } = useAnimation();

  const [showSidebar, setShowSidebar] = useState(false);
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent | React.MouseEvent) => {
      if (!menuRef?.current?.contains(e?.target as Node)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  // const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const isDashboard = currentPath === "dashboard";

  return (
    <div className="main-layout">
      <div
        className={`main-layout-sidebar ${
          showSidebar ? "main-layout-toggle-mobile-sidebar" : ""
        }  `}
      >
        <Sidebar collapseSidebar={collapseSidebar} />
      </div>

      {showSidebar ? <span className="main-layout-shadow"></span> : null}

      <div
        className={`main-layout-content ${
          showSidebar ? "main-layout-disable-events" : ""
        } ${isAnimating ? "" : ""}`}
      >
        <div className="main-layout-navbar">
          <Navbar
            setShowSidebar={setShowSidebar}
            setCollapseSidebar={setCollapseSidebar}
            collapseSidebar={collapseSidebar}
          />
        </div>
        <div
          // onClick={() => {
          //   if (isAuthenticated) return;
          //   navigate(PATH.ROLE);
          // }}
          className={`${
            isDashboard ? "main-layout-outlet-analytic" : "main-layout-outlet"
          } ${
            isAnimating
              ? `${
                  isDashboard
                    ? "main-layout-outlet-animate-analytic"
                    : "main-layout-outlet-animate"
                }`
              : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
