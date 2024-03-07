import Button from '@src/modules/shared/components/Button/Button';
import {
  //   useLocation,
  useNavigate,
} from 'react-router-dom';
// import { PATH } from '@src/modules/auth/routes/paths';
// import { useDispatch, useSelector } from 'react-redux';
// import { initialStateType, setRole } from '../../data/roleSlice';
// import { useEffect } from 'react';
import { useAppDispatch } from '@src/modules/shared/store';
import Input from '@src/modules/shared/components/Input/Input';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import { enterNewPassword } from '../../data/authThunk';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { PATH } from '../../routes/paths';

const initialValues = {
  password: '',
  confirmPassword: '',
};
function EnterNewPassword() {
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  const { token } = useParams() as any;
  // console.log(token);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('password is required')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.-/]).{8,}$/,
          'Password must include an upper case letter, a lower case letter and a special character! It has to be 8 characters long at least.'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('confirm password is required'),
    }),
    onSubmit: (values) => {
      // console.log('hola');
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      // console.log(changedValues);
      const { password: newPassword } = changedValues;
      console.log(newPassword, token);

      dispatch(enterNewPassword({ newPassword, token }))
        .unwrap()
        .then(() => {
          toast.success('Password has been reset!');
          navigate(PATH.LOGIN);
        })
        .catch((err: any) => {
          toast.error(err?.message || 'something-went-wrong');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  console.log(formik);
  return (
    <div className="enter-module">
      <div className="enter-card-container">
        <h1 className="enter-title">Enter your new Password</h1>
        <h1 className="enter-text">Don't forget it this time!</h1>
        <form className="enter-form" onSubmit={formik.handleSubmit}>
          <Input
            name="password"
            formik={formik}
            variant="secondary"
            placeholder="new password"
            label="Password"
            type="password"
            required={true}
          />
          <Input
            name="confirmPassword"
            formik={formik}
            variant="secondary"
            placeholder="confirm password"
            label="Confirm Password"
            type="password"
            required
          />
          <Button
            label={'Reset Password'}
            type={'submit'}
            loading={submitting}
          />
        </form>
      </div>
    </div>
  );
}

export default EnterNewPassword;
