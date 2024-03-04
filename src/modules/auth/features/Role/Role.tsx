import Button from '@src/modules/shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/modules/auth/routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { initialStateType, setRole } from '../../data/roleSlice';

function Role() {
  const dispatch = useDispatch();
  const role: string = useSelector((state: initialStateType) => state.role);
  const navigate = useNavigate();
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
          <Button label={'Customer'} onClick={() => handleRole('customer')} />
          <Button label={'Vendor'} onClick={() => handleRole('vendor')} />
        </div>
      </div>
    </div>
  );
}

export default Role;
