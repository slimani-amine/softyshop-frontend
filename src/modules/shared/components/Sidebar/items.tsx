/* eslint-disable react-refresh/only-export-components */
import { ReactComponent as DashboardIcon } from "../../assets/icons/sidebar/dashboard.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/sidebar/profile.svg";
import { ReactComponent as ProductIcon } from "../../assets/icons/sidebar/Product.svg";
import { ReactComponent as CatergoryIcon } from "../../assets/icons/sidebar/catergory.svg";
import { ReactComponent as BrandIcon } from "../../assets/icons/sidebar/brand.svg";
import { ReactComponent as StoreIcon } from "../../assets/icons/sidebar/bookstore.svg";

export const SIDEBARITEMS = [
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    roles: ["ADMIN" , "VENDOR"]
  },
  {
    link: "",
    label: "Products",
    icon: <ProductIcon />,
    roles : ["ADMIN" , "VENDOR"],
    children: [
      {
        link: "/vendor/Products",
        label: "Product List",
        icon: "'",
        roles: ["ADMIN" , "VENDOR"]

      },
      {
        link: "/vendor/Products/create",
        label: "Create Product",
        icon: "",
        roles: ["ADMIN" , "VENDOR"]
      },
      {
        link: "/vendor/Products/",
        label: "Product Review",
        icon: "",
        roles: ["ADMIN" , "VENDOR"]
      },
    ],
  },
  {
    link: "",
    label: "Categories",
    icon: <CatergoryIcon />,
    roles : ["ADMIN"],
    children: [
      {
        link: "/vendor/Categories",
        label: "Categories List",
        icon: "'",
        roles: ["ADMIN"]
      },
      {
        link: "/vendor/Categories/create",
        label: "Create Category",
        icon: "",
        roles: ["ADMIN"]
      },
      {
        link: "/vendor",
        label: "Product Review",
        icon: "",
        roles: ["ADMIN"]
      },
    ],
  },
  {
    link: "",
    label: "Stores",
    icon: <StoreIcon />,
    roles : ["ADMIN","VENDOR"],
    children: [
      {
        link: "/vendor/stores",
        label: "Stores List",
        icon: "'",
        roles: ["ADMIN"]
      },
      {
        link: "/vendor/stores/create",
        label: "Create Store",
        icon: "",
        roles: ["ADMIN"]
      },
      {
        link: "/vendor//",
        label: "Product Review",
        icon: "",
        roles: ["ADMIN"]
      },
    ],
  },

  
  {
    link: "/brand",
    label: "Brands",
    icon: <BrandIcon />,
   
  },

  {
    link: "/settings",
    label: "Settings",
    icon: <CatergoryIcon />,
  },
  {
    link: "/profile",
    label: "Profile",
    icon: <ProfileIcon />,
  },
];
