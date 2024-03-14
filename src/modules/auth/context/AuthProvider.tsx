import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axiosInstance from '../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
// import { clearTokens, getTokens } from '../utils/token';
import useIsMountedRef from '../hook/useIsMountedRef';
import { initialise } from '../data/authSlice';
import { RootState } from '@src/modules/shared/store';
import LazyLoad from '@src/modules/shared/components/LazyLoad/LazyLoad';
import { BASE_URL } from '../data/authThunk';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface JwtPayload {
  exp: number;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef();

  const { isInitialised } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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
      // const { accessToken } = getTokens();

      const accessToken: string | null = localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        const response = await axiosInstance.get(`${BASE_URL}api/users/me`);

        const user = response?.data?.data;
        // console.log(user.role);
        // const user = {
        //   email: 'string',
        //   isVerified: true,
        //   firstName: 'string',
        //   lastName: 'string',
        //   picture: 'string',
        //   role: 'admin',
        // };

        dispatch(initialise({ isAuthenticated: true, user }));
      } else {
        dispatch(initialise({ isAuthenticated: false, user: null }));
        // clearTokens();
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
