import Button from '@src/modules/shared/components/Button/Button';
import { useAppSelector } from '@src/modules/shared/store';
import { useAppDispatch } from '@src/modules/shared/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../data/authThunk';
import Input from '@src/modules/shared/components/Input/Input';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import { useState } from 'react';
import {
  Link,
  // , useLocation
  useNavigate,
} from 'react-router-dom';
import { PATH } from '../../routes/paths';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const initialValues = {
  firstName: '',
  lastName: '',
  // username: '',
  email: '',
  password: '',
  verifyPassword: '',
  phoneNumber: null,
  role: '',
  // age: null,
  // birthDate: null,
};

const Register = () => {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  // useEffect(
  //   function () {
  //     if (isAuthenticated && pathname === '/register') navigate('/home');
  //   },
  //   [pathname, isAuthenticated]
  // );

  const dispatch = useAppDispatch();
  const { role } = useSelector((state: any) => state.role);

  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^([9527]\d{7})$/g, 'Invalid phone number'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(
          /^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
          'Invalid email address'
        )
        .test(
          'no-special-chars',
          'Email contains disallowed characters',
          (value: string | undefined) =>
            !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value)
        )
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.-/]).{8,}$/,
          'Password must include an upper case letter, a lower case letter and a special character! It has to be 8 characters long at least.'
        ),
      verifyPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      values.role = role;
      // console.log(role);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(register(changedValues))
        .unwrap()
        .then(() => {
          toast.success('Account created successfully');
          navigate('/home');
        })
        .catch((err) => {
          toast.error(err?.message || 'something-went-wrong');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  // {
  //   console.log(formik);
  // }
  return (
    <div className="register-module">
      <form className="register-card-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Sign Up</h1>

        <Input
          name="firstName"
          formik={formik}
          variant="secondary"
          placeholder="Enter your firstname"
          label="First Name"
          required={true}
        />

        <Input
          name="lastName"
          formik={formik}
          variant="secondary"
          placeholder="Enter your lastname"
          label="Last Name"
          required={true}
        />

        <Input
          name="phoneNumber"
          formik={formik}
          variant="secondary"
          placeholder="Enter phone number"
          label="Phone Number"
          required={true}
        />

        <Input
          name="email"
          formik={formik}
          variant="secondary"
          placeholder="Enter your email"
          label="Email"
          type="email"
          required={true}
        />

        <Input
          name="password"
          formik={formik}
          variant="secondary"
          placeholder="Enter your password"
          label="Password"
          type="password"
          required={true}
        />

        <Input
          name="verifyPassword"
          formik={formik}
          variant="secondary"
          placeholder="Enter your confirm password"
          label="Confirm Password"
          type="password"
          required={true}
        />

        <Button label={'Sign Up'} type={'submit'} loading={submitting} />

        <Link to={PATH.LOGIN} className="link">
          Already a member?
        </Link>
      </form>
    </div>
  );
};

export default Register;
