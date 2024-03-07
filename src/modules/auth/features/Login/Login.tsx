import Button from '@src/modules/shared/components/Button/Button';
import {
  useAppDispatch,
  //  useAppSelector
} from '@src/modules/shared/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../data/authThunk';
import Input from '@src/modules/shared/components/Input/Input';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import {
  //  useEffect,
  useState,
} from 'react';
import {
  Link,
  //  useLocation,
  useNavigate,
} from 'react-router-dom';
import { PATH } from '../../routes/paths';
import toast from 'react-hot-toast';
import jwtDecode from 'jwt-decode';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  // useEffect(
  //   function () {
  //     if (isAuthenticated && pathname === '/login') navigate('/home');
  //   },
  //   [pathname, isAuthenticated]
  // );

  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is too short!'),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(login(changedValues))
        .unwrap()
        .then(() => {
          toast.success('Welcome to SoftyShop!');
          navigate('/home');
        })
        .catch((err) => {
          toast.error(err?.message || 'something-went-wrong');
        })
        .finally(() => {
          const accessToken: any = localStorage.getItem('accessToken');
          const decoded: any = jwtDecode(accessToken);
          const role = decoded.role;
          console.log(role);
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-module">
      <form className="login-card-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Login</h1>

        <Input
          defaultValue="fadi@benromdhan.com"
          name="email"
          formik={formik}
          variant="secondary"
          placeholder="Enter your email"
          label="Email"
          required={true}
        />

        <Input
          defaultValue="Fadi@123"
          name="password"
          formik={formik}
          variant="secondary"
          placeholder="Enter your password"
          label="Password"
          type="password"
          required={true}
        />
        <Button label={'Login'} type={'submit'} loading={submitting} />
        <div className="links">
          <Link to={PATH.ROLE} className="link">
            Create Account?
          </Link>
          <p>||</p>
          <Link to={PATH.RESET} className="link">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
