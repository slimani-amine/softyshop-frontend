/* eslint-disable react-refresh/only-export-components */
import { ReactComponent as DashboardIcon } from "../../assets/icons/sidebar/dashboard.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/sidebar/profile.svg";
import { ReactComponent as ProductIcon } from "../../assets/icons/sidebar/Product.svg";
import { ReactComponent as CatergoryIcon } from "../../assets/icons/sidebar/catergory.svg";
import { ReactComponent as BrandIcon } from "../../assets/icons/sidebar/brand.svg";

export const SIDEBARITEMS = [
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    link: "",
    label: "Products",
    icon: <ProductIcon />,
    children: [
      {
        link: "/vendor/Products",
        label: "Product List",
        icon: "'",
      },
      {
        link: "/vendor/Products/create",
        label: "Create Product",
        icon: "",
      },
      {
        link: "/vendor/Products/",
        label: "Product Review",
        icon: "",
      },
    ],
  },
  {
    link: "",
    label: "Categories",
    icon: <ProductIcon />,
    children: [
      {
        link: "/vendor/Categories",
        label: "Categories List",
        icon: "'",
      },
      {
        link: "/vendor/Products/create",
        label: "Create Category",
        icon: "",
      },
      {
        link: "/vendor/Products/",
        label: "Product Review",
        icon: "",
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
