import Button from '@src/modules/shared/components/Button/Button';
import {
  // useLocation,
  useNavigate,
} from 'react-router-dom';
import { PATH } from '@src/modules/auth/routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { initialStateType, setRole } from '../../data/roleSlice';
// import { useEffect } from 'react';
import { useAppSelector } from '@src/modules/shared/store';
import { Link } from 'react-router-dom';

function Role() {
  const dispatch = useDispatch();
  const role: any = useSelector((state: initialStateType) => state.role);
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  console.log(role);

  // useEffect(
  //   function () {
  //     if (isAuthenticated && pathname === '/role') navigate('/home');
  //   },
  //   [pathname, isAuthenticated]
  // );

  function handleRole(frole: string = role) {
    dispatch(setRole(frole));
    navigate(PATH.REGISTER);
  }

  return (
    <div className="role-module">
      <div className="role-card-container">
        <h1 className="role-title">Welcome to SoftyShop!</h1>
        <h1 className="role-text">
          Are you willing to buy books or sell some?
        </h1>
        <div className="buttons">
          <Button label={'Customer'} onClick={() => handleRole('user')} />
          <Button label={'Vendor'} onClick={() => handleRole('vendor')} />
        </div>
        <Link to={PATH.LOGIN} className="link">
          Already a member?
        </Link>
      </div>
    </div>
  );
}

export default Role;
