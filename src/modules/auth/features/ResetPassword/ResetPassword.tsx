import Button from "@src/modules/shared/components/Button/Button";
import { useAppDispatch } from "@src/modules/shared/store";
import Input from "@src/modules/shared/components/Input/Input";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { getChangedValues } from "@src/modules/shared/utils/getChangedValuesFormik";
import { resetPassword } from "../../data/authThunk";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
};
function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(resetPassword(changedValues))
        .unwrap()
        .then(() => {
          toast.success("Email sent!");
        })
        .catch((err: any) => {
          toast.error(err?.message || "something-went-wrong");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="reset-module">
      <div className="reset-card-container">
        <h1 className="reset-title">Reset Password</h1>
        <h1 className="reset-text">
          Forgot your password? Don't worry! Please hand us your email and we
          will reset it for you.
        </h1>
        <form className="reset-form" onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            formik={formik}
            variant="secondary"
            placeholder="Enter your email"
            label="Email"
            required={true}
          />
          <Button label={"Continue"} type={"submit"} loading={submitting} />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
