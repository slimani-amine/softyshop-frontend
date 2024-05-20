import GoogleIcon from "../GoogleIcon";
import {
  exchangeCodeForIdToken,
  googleLogin,
} from "@src/modules/auth/data/authThunk";
import { useAppDispatch } from "../../store";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../Button/Button";

const GoogleButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSuccess = async (tokenResponse: any) => {
    const idToken = (await exchangeCodeForIdToken(tokenResponse?.code)) as any;
    if (idToken) dispatch(googleLogin({ idToken }));
  };

  const Googlelogin = useGoogleLogin({
    onSuccess,
    onError: (error) => console.log(error),
    flow: "auth-code",
  });

  return (
    <div
      className="container"
      style={{
       
      }}
    >
      <Button
        className="google-button"
        onClick={Googlelogin}
        type="button"
      >
        <GoogleIcon />
        <span className="text-black">Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleButton;
