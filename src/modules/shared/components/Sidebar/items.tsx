/* eslint-disable react-refresh/only-export-components */
import { ReactComponent as DashboardIcon } from '../../assets/icons/sidebar/dashboard.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as ProductIcon } from '../../assets/icons/sidebar/product.svg'
import { ReactComponent as CatergoryIcon } from '../../assets/icons/sidebar/catergory.svg'
import { ReactComponent as BrandIcon } from '../../assets/icons/sidebar/brand.svg'

export const SIDEBARITEMS = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    link : "",
    label : "Products",
    icon : <ProductIcon/>,
    children: [
      {
        link: '/vendor/products/list',
        label: 'Product List',
        icon: "'",
      },
      {
        link: '/vendor/products/create',
        label: 'Create Product',
        icon: "",
      },
      {
        link: '/vendor/products/',
        label: 'Product Review',
        icon: "",
      },
    ]
  },
  {
    link: '/categories',
    label: 'Categories',
    icon: <CatergoryIcon />,
  },
  {
    link: '/brand',
    label: 'Brands',
    icon: <BrandIcon />,
  },

  {
    link: '/settings',
    label: 'Settings',
    icon: <CatergoryIcon />,
  },
  {
    link: '/profile',
    label: 'Profile',
    icon: <ProfileIcon />,
  },
]

