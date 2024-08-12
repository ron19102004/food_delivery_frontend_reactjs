import { FC } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../../components/ui/input-otp";
import { APP_NAME } from "../../../../utils/constant.util";
import { verifyOtp } from "../../../../apis/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth.hook";

interface IVerifyOTPProps {
  token: string;
}
const VerifyOTP: FC<IVerifyOTPProps> = ({ token }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onChange = async (value: string) => {
    if (value.length === 6) {
      await verifyOtp(
        {
          code: value,
          token: token,
        },
        (res) => {
          if (!res.status) {
            toast(res.message, {
              type: "error",
            });
            return;
          }
          auth.login(res.data.user, res.data.access_token);
          toast(res.message, {
            type: "success",
          });
          navigate("/");
        },
        (err) => {
          const res = err?.response?.data;
          toast(res?.message ?? "Undefined error", {
            type: "error",
          });
        }
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-full text-slate-700">
      <div className="p-10 bg-white rounded xl:shadow-lg">
        <h1 className="font-font1 text-4xl lg:text-5xl font-semibold text-center px-5 md:px-0 text-orange-600">
          Welcome To {APP_NAME}
        </h1>
        <hr className="border-orange-600 my-2" />
        <h2 className="text-center text-3xl lg:text-4xl font-medium font-font2">
          Verify OTP
        </h2>
        <div className="flex justify-center items-center my-3">
          <InputOTP maxLength={6} onChange={onChange}>
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-11 h-11 font-font2 text-xl"
              />
              <InputOTPSlot
                index={1}
                className="w-11 h-11 font-font2 text-xl"
              />
              <InputOTPSlot
                index={2}
                className="w-11 h-11 font-font2 text-xl"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="w-11 h-11 font-font2 text-xl"
              />
              <InputOTPSlot
                index={4}
                className="w-11 h-11 font-font2 text-xl"
              />
              <InputOTPSlot
                index={5}
                className="w-11 h-11 font-font2 text-xl"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
