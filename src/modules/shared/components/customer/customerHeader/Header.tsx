import { ReactComponent as ShoppingBagIcon1 } from '../../../assets/icons/customerLayout/Header/shoppingBag.svg';
import { ReactComponent as ProfileIcon1 } from '../../../assets/icons/customerLayout/Header/profileIcon.svg';
import { ReactComponent as MagnifyingGlass1 } from '../../../assets/icons/customerLayout/Header/MagnifyingGlass.svg';
import { ReactComponent as ChevronDownBlack } from '../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg';
import Logo from '../../../assets/icons/customerLayout/Header/logo-complete.svg';
import Search from './components/Search';
function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
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
        <div className="profile-icon-wrapper">
          <ProfileIcon1 className="profile-icon" />
        </div>
        <div className="shopping-bag-icon-wrapper">
          <ShoppingBagIcon1 className="shopping-bag-icon" />
        </div>

        <span className="cart-items-number">
          <p>3</p>
        </span>
      </div>
    </div>
  );
}

export default Header;