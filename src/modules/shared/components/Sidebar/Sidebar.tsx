import SidebarItems from "../SidebarItems/SidebarItems";
import { useAnimation } from "../../layout/MainLayout/context/animationContext";

interface ISidebarProps {
  collapseSidebar: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  const {
    // toggleAnimation ,
    isAnimating,
  } = useAnimation();

  return (
    <div className={`${isAnimating ? "sidebar-animate" : " "} sidebar`}>
      <div className="sidebar-content">
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
