import { ReactComponent as ShoppingBagIcon1 } from "../../../assets/icons/customerLayout/Header/shoppingBag.svg";
import { ReactComponent as ProfileIcon1 } from "../../../assets/icons/customerLayout/Header/profileIcon.svg";
import { ReactComponent as MagnifyingGlass1 } from "../../../assets/icons/customerLayout/Header/magnifyingGlass.svg";
import { ReactComponent as ChevronDownBlack } from "../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg";
import { ReactComponent as Home } from "../../../assets/icons/customerLayout/Header/home.svg";
// import { ReactComponent as Shop } from "../../../assets/icons/customerLayout/Header/shop.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/sidebar/profile.svg";
import Logo from "../../../assets/icons/customerLayout/Header/logo-complete.svg";
import Search from "./components/Search";
import { useAppSelector, useAppDispatch } from "@src/modules/shared/store";
import { showDrawer } from "@src/modules/customer/data/drawerSlice";
import TheDrawer from "@src/modules/customer/home/components/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { getCart } from "@src/modules/customer/data/cartThunk";
import { useEffect } from "react";
import { Avatar, Dropdown, Space, MenuProps } from "antd";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/navbar/settings.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/navbar/logout.svg";
import { ReactComponent as Buisness } from "../../../assets/icons/navbar/marketing-bill-payment-invoice-receipt-svgrepo-com.svg";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import { logout } from "@src/modules/auth/data/authThunk";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const token = useAppSelector((state) => state.cart.token);

  useEffect(() => {
    function getTheCart() {
      dispatch(getCart(token));
    }
    getTheCart();
    if (token === "" || token !== accessToken) {
      window.location.reload();
    }
  }, [token, dispatch, getCart]);

  const myCartItemsNumber: any = useAppSelector(
    (state) => state.cart.cartItems
  );
  function interactWithDrawer() {
    dispatch(showDrawer());
  }
  const current_user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const accountInfoItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <Avatar
            size={32}
            className="navbar-avatar"
            src={current_user?.picture}
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
      key: "4",
      label: <p>Settings</p>,
      icon: (
        <SettingsIcon
          style={{ stroke: "black", width: "18px", height: "18px" }}
        />
      ),
    },
    {
      key: "5",
      label: <p onClick={handleLogout}>logout</p>,
      icon: (
        <LogoutIcon
          style={{ stroke: "black", width: "18px", height: "18px" }}
        />
      ),
    },
  ];

  return (
    <>
      <TheDrawer></TheDrawer>
      <div className="header">
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="logo-wrapper"
        >
          <img src={Logo} alt="" />
        </div>
        <div className="middle-component">
          <div className="magnifyingGlassIcon">
            <MagnifyingGlass1 />
            <span className="divider"></span>
          </div>
          <div>
            <Search />
          </div>
          <div className="categories">
            <p>All Categories</p>
            <ChevronDownBlack />
          </div>
        </div>

        <div className="icons">
          {/* <Link
            to="/home"
            className="profile-icon-wrapper"
            style={{
              transform: "translate(3px,8px)",
            }}
          > */}
            {/* <Home className="profile-icon" />
          </Link> */}

          {/* <div
            className="profile-icon-wrapper"
            style={{
              transform: "translate(0,5px)",
            }}
          >
            <Shop className="profile-icon" />
          </div> */}

          <div className="profile-icon-wrapper">
            <Dropdown
              menu={{ items: accountInfoItems }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
              className="navbar-dropdown-cursor"
            >
              <ProfileIcon1 className="profile-icon" />
            </Dropdown>
          </div>
          <div className="shopping-bag-icon-wrapper">
            <ShoppingBagIcon1 onClick={() => interactWithDrawer()} />
          </div>

          <span className="cart-items-number">
            <p>{myCartItemsNumber}</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
