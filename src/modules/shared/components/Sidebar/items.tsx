/* eslint-disable react-refresh/only-export-components */
import { ReactComponent as ProductIcon } from "../../assets/icons/sidebar/Product.svg";
import { ReactComponent as CatergoryIcon } from "../../assets/icons/sidebar/catergory.svg";
import { ReactComponent as BrandIcon } from "../../assets/icons/sidebar/brand.svg";
import { ReactComponent as StoreIcon } from "../../assets/icons/sidebar/bookstore.svg";
import { ReactComponent as VendorIcon } from "../../assets/icons/sidebar/vendor.svg";

export const SIDEBARITEMS = [
  
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
    roles : ["ADMIN","VENDOR"],
   
  },

  {
    link:  "/stores",
    label: "Stores",
    icon: <StoreIcon />,
    roles : ["ADMIN","VENDOR"],
    
  },
  {
    link: "/vendors",
    label: "Vendors",
    icon: <VendorIcon />,
    roles : ["ADMIN","VENDOR"],
   
  },
  {
    link: "/brands",
    label: "Brands",
    icon: <VendorIcon />,
    roles : ["VENDOR","ADMIN"],
  },


  
  {
    link: "/creators",
    label: "Creators",
    icon: <BrandIcon />,
    roles : ["VENDOR","ADMIN"]
   
  },


];
