import Button from '@src/modules/shared/components/Button/Button';
import { useAppDispatch } from '@src/modules/shared/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../data/authThunk';
import Input from '@src/modules/shared/components/Input/Input';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/paths';

const initialValues = {
  firstName: '',
  lastName: '',
  // username: '',
  email: '',
  password: '',
  verifyPassword: '',
  // phone: null,
  // age: null,
  // birthDate: null,
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('FirstName is required'),
      lastName: Yup.string().required('LastName is required'),
      // username: Yup.string().required('Username is required'),
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
        .min(6, 'Password is too short!'),
      verifyPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      // values.username =
      //   values.firstName.replace(' ', '_') +
      //   '_' +
      //   values.lastName.replace(' ', '_');
      // console.log(values);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(register(changedValues))
        .unwrap()
        .then(() => {
          console.log('Account created successfully');
          console.log(changedValues);
          navigate(PATH.LOGIN);
        })
        .catch((err) => {
          alert(err?.message || 'something-went-wrong');
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

        {/* <Input
          name="username"
          formik={formik}
          variant="secondary"
          placeholder="Enter your username"
          label="Username"
          required={true}
        /> */}

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
