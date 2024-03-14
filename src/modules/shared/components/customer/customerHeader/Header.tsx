import ShoppingBagIcon from '../../../assets/icons/customerLayout/Header/shoppingBag.svg';
import ProfileIcon from '../../../assets/icons/customerLayout/Header/profileIcon.svg';
import MagnifyingGlass from '../../../assets/icons/customerLayout/Header/MagnifyingGlass.svg';
import Logo from '../../../assets/icons/customerLayout/Header/logo-complete.svg';

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="" />
      <img src={MagnifyingGlass} alt="" />
      <img src={ProfileIcon} alt="" />
      <img src={ShoppingBagIcon} alt="" />
      {/* <ShoppingBagIcon />
      <ProfileIcon />
      <MagnifyingGlass /> */}
    </div>
  );
}

export default Header;
