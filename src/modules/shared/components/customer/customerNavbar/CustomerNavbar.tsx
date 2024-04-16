// import { ReactComponent as ChevronDownBlack } from '../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg';
import { ReactComponent as ChevronRightBlack } from '../../../assets/icons/customerLayout/Navbar/chevron-right-black.svg';
import { ReactComponent as CategoriesIcon } from '../../../assets/icons/customerLayout/Navbar/categories-icon.svg';
// import NavigationElement from './components/navigationElements/NavigationElement';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@src/modules/shared/store';
import { logout } from '@src/modules/auth/data/authThunk';
import Button from '../../Button/Button';

function CustomerNavbar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="customer-navbar">
      <div className="categories">
        {/* <img src={ChevronDownBlack} alt="" /> */}
        <div className="icon-and-title">
          <CategoriesIcon />
          <p className="categories-title">Categories</p>
        </div>
        <ChevronRightBlack />
      </div>
      {/* <select name="categories-select">
        <option value="">Categories</option>
        <option value="dog">Fashion</option>
        <option value="cat">Electronics</option>
        <option value="hamster">Bikes</option>
        <option value="parrot">Home & Garden</option>
        <option value="spider">Gifts</option>
        <option value="goldfish">Music</option>
      </select> */}
      <div className="navigation-elements">
        <Link to="/home">Home</Link>
        <Link to="/books" className="all-customer-books">
          All Books
        </Link>
        {/* <NavigationElement>Pages</NavigationElement>
        <NavigationElement>User Account</NavigationElement>
        <NavigationElement>Vendor Account</NavigationElement> */}
        <Button label={'Logout'} onClick={handleLogout}></Button>
        {/* <p  className="logout">
          logout
        </p> */}
      </div>
    </div>
  );
}

export default CustomerNavbar;
