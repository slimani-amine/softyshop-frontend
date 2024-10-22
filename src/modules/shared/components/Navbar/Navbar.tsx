import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
import browseIcon from "../../assets/icons/navbar/website.png";
import { ReactComponent as ProfileIcon } from "../../assets/icons/sidebar/profile.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/navbar/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/navbar/logout.svg";
import { RootState, useAppDispatch } from "../../store";
import { logout } from "@src/modules/auth/data/authThunk";
import Search from "../Search/Search";
import NotificationIcon from "../../assets/icons/navbar/bell.png";
//eslint-ignore-next-line
import { useAnimation } from "../../layout/MainLayout/context/animationContext";
import { useSelector } from "react-redux";
interface INavbarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  collapseSidebar: boolean;
}

const Navbar: React.FC<INavbarProps> = () => {
  const { isAnimating } = useAnimation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const current_user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleNavigate = () => {
    navigate("/home");
  };
  const accountInfoItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <Avatar
            size={32}
            className="navbar-avatar"
            src={
              current_user?.picture ===
              "http://localhost:3001/images/default.png"
                ? "https://img.freepik.com/premium-vector/user-profile-icon-vector-9_666870-1776.jpg"
                : current_user?.picture
            }
            alt="User picture"
          />
          <div className="navbar-account-info">
            <p className="sidebar-accountinfo-item">{current_user?.email}</p>
            <p>Role: {current_user?.role}</p>
          </div>
        </Space>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: <p>Profile</p>,
      onClick: () => {
        navigate("/my-profile");
      },
      icon: (
        <ProfileIcon
          style={{ stroke: "black", width: "18px", height: "18px" }}
        />
      ),
    },
    {
      key: "3",
      label: <p>Settings</p>,
      icon: (
        <SettingsIcon
          style={{ stroke: "black", width: "18px", height: "18px" }}
        />
      ),
    },
    {
      key: "4",
      label: <p onClick={handleLogout}>logout</p>,
      icon: (
        <LogoutIcon
          style={{ stroke: "black", width: "18px", height: "18px" }}
        />
      ),
    },
  ];

  return (
    <div className={` ${isAnimating ? "" : ""} navbar `}>
      <div
        className={`navbar-left ${isAnimating ? "navbar-left-animate" : ""}`}
      >
        {/*<img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon"
          onClick={() => {
            setCollapseSidebar(false)
            setShowSidebar(true)
          }}
        />
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon-collapse"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <p className="navbar-left-title">{pathname.split('/')[1]}</p>*/}
        <div className="browse_btn" onClick={handleNavigate}>
          <img className="browse_icon" src={browseIcon} alt="" />
          <span>Browse Website</span>
        </div>
      </div>
      <div
        className={`navbar-right ${isAnimating ? "navbar-right-animate" : ""} `}
      >
        <Space size={"middle"}>
          <Search />

          <div className="notification">
            <div className="point_notifcation"></div>
            <img className="Icon_notification" src={NotificationIcon} alt="" />
          </div>

          <Dropdown
            menu={{ items: accountInfoItems }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
            className="navbar-dropdown-cursor"
          >
            <Space>
              <Avatar size={32} className="navbar-avatar"></Avatar>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default Navbar;
