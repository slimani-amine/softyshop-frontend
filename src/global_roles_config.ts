import { useSelector } from 'react-redux';
import { RootState } from './modules/shared/store';
export const ADMIN = 'ADMIN';
export const VENDOR = 'VENDOR';
export const CUSTOMER = 'USER';

export default function global_roles_config() {
  const current_user = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  return current_user;
}
