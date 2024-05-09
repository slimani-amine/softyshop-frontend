import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axiosInstance from '../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import useIsMountedRef from '../hook/useIsMountedRef';
import { initialise } from '../data/authSlice';
import { RootState } from '@src/modules/shared/store';
import LazyLoad from '@src/modules/shared/components/LazyLoad/LazyLoad';
import { AUTH_URL } from '../data/authThunk';
import { saveToken } from '@src/modules/customer/data/cartSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface JwtPayload {
  exp: number;
}

export const accessToken: any = localStorage.getItem('accessToken');

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const isMounted = useIsMountedRef();
  // const [updatedToken, setUpdatedToken] = useState(accessToken);

  const { isInitialised } = useSelector((state: RootState) => state.auth);
  // while (!updatedToken)
  //   setTimeout(() => {
  //     setUpdatedToken(accessToken);
  //   }, 500);
  dispatch(saveToken(accessToken));

  const isValidToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    async function fetchUser() {
      if (accessToken && isValidToken(accessToken)) {
        const response = await axiosInstance.get(`${AUTH_URL}api/users/me`);

        const user = response?.data?.data;
        // todo const user = { ...response?.data?.data, token: accessToken };
        // console.log(user);
        dispatch(initialise({ isAuthenticated: true, user }));
      } else {
        dispatch(initialise({ isAuthenticated: false, user: null }));
      }
    }

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialised) {
    return <LazyLoad />;
  }

  return <>{children}</>;
};

export default AuthProvider;
