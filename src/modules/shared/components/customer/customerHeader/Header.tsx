import { ReactComponent as ShoppingBagIcon1 } from '../../../assets/icons/customerLayout/Header/shoppingBag.svg';
import { ReactComponent as ProfileIcon1 } from '../../../assets/icons/customerLayout/Header/profileIcon.svg';
import { ReactComponent as MagnifyingGlass1 } from '../../../assets/icons/customerLayout/Header/magnifyingGlass.svg';
import { ReactComponent as ChevronDownBlack } from '../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg';
import Logo from '../../../assets/icons/customerLayout/Header/logo-complete.svg';
import Search from './components/Search';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { showDrawer } from '@src/modules/customer/data/drawerSlice';
import TheDrawer from '@src/modules/customer/home/components/Cart/Cart';
import { useNavigate } from 'react-router-dom';
import { getCart } from '@src/modules/customer/data/cartThunk';
import { useEffect } from 'react';

function Header() {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const token = useAppSelector((state) => state.cart.token);

  useEffect(() => {
    function getTheCart() {
      dispatch(getCart(token));
    }
    getTheCart();
  }, [token, dispatch, getCart]);

  const myCartItemsNumber: any = useAppSelector(
    (state) => state.cart.cartItems
  );
  const role: string | undefined = useAppSelector(
    (state) => state.auth.user?.role
  );
  function interactWithDrawer() {
    dispatch(showDrawer());
  }

  return (
    <>
      <TheDrawer></TheDrawer>
      <div className="header">
        <div
          onClick={() => {
            if (role == 'user') navigate('/home');
            else navigate('/products');
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
          <div className="profile-icon-wrapper">
            <ProfileIcon1 className="profile-icon" />
          </div>
          <div className="shopping-bag-icon-wrapper">
            <ShoppingBagIcon1
              onClick={() => interactWithDrawer()}
              className="shopping-bag-icon"
            />
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
