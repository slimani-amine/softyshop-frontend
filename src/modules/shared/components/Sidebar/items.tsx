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
    link: "/products",
    label: "Products",
    icon: <ProductIcon />,
    roles : ["ADMIN" , "VENDOR"],
    
  },
  {
    link: "/categories",
    label: "Categories",
    icon: <CatergoryIcon />,
    roles : ["ADMIN"],
   
  },
  {
    link:  "/stores",
    label: "Stores",
    icon: <StoreIcon />,
    roles : ["ADMIN","VENDOR"],
    
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
