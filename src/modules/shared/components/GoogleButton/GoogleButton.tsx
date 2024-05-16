import { Button } from "antd";
import GoogleIcon from "../GoogleIcon";
import {
  exchangeCodeForIdToken,
  googleLogin,
} from "@src/modules/auth/data/authThunk";
import { useAppDispatch } from "../../store";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSuccess = async (tokenResponse: any) => {
    const idToken = (await exchangeCodeForIdToken(tokenResponse?.code)) as any;
    console.log("🚀 ~ onSuccess ~ idToken:", idToken);
    if (idToken) dispatch(googleLogin({ idToken }));
  };

  const Googlelogin = useGoogleLogin({
    onSuccess,
    onError: (error) => console.log(error),
    flow: "auth-code",
  });

  return (
    <div
      className="w-full flex items-center justify-center mb-2"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        className="w-full items-center justify-center h-9 px-2 py-1 border flex border-color rounded-[5px] text-slate-700  hover:border-slate-400  hover:text-slate-900 hover:shadow transition duration-150"
        onClick={Googlelogin}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GoogleIcon />
        <span className="text-black">Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleButton;
