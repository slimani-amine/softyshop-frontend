import chevronDownBlack from '../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg';
import chevronRightBlack from '../../../assets/icons/customerLayout/Navbar/chevron-right-black.svg';
import categoriesIcon from '../../../assets/icons/customerLayout/Navbar/categories-icon.svg';
import NavigationElement from './components/navigationElements/NavigationElement';

function CustomerNavbar() {
  return (
    <div className="customer-navbar">
      <div className="navigation-elements">
        <NavigationElement>Home</NavigationElement>
        <NavigationElement>Mega Menu</NavigationElement>
        <NavigationElement>Full Screen Menu</NavigationElement>
        <NavigationElement>Pages</NavigationElement>
        <NavigationElement>User Account</NavigationElement>
        <NavigationElement>Vendor Account</NavigationElement>
      </div>

      {/* <img src={chevronDownBlack} alt="" /> */}
      <img src={categoriesIcon} alt="" />
      <img src={chevronRightBlack} alt="" />
    </div>
  );
}

export default CustomerNavbar;
