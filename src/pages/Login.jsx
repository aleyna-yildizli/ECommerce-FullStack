import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../store/actions/userActions";
import AnimatedPiggyBankIcon from "../components/widgets/PiggyBankIcon";
import PiggyLoading from "../components/widgets/PiggyLoading/PiggyLoading";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  const handleShowClick = () => {
    setShowHelpOptions(!showHelpOptions);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(data, history));
      localStorage.setItem("user", data.email);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`w-full flex flex-col bg-[#e7f0fd] ${
        animate ? "animate-login" : ""
      }`}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="absolute font-extrabold text-[199px] text-white opacity-50 right-[3%] top-[10%] hidden md:block ">
        Log in
      </h2>
      <div className="max-w-xl w-full mx-auto p-10 mt-20  ">
        {isLoading ? (
          <div className="fullscreen">
            <div className="flex flex-col justify-center items-center">
              <PiggyLoading />
              <h1 className="font-bold text-gray-500 text-[60px] mt-20 ml-10">
                LOADING...
              </h1>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="bg-white p-10 border border-gray-300 mt-6 rounded-lg shadow-md">
          <div className="flex flex-col justify-center items-center">
            <div className="hidden md:flex absolute top-[212px] left-1/2 transform -translate-x-1/2">
              <AnimatedPiggyBankIcon />
              <AnimatedPiggyBankIcon />
              <AnimatedPiggyBankIcon />
              <AnimatedPiggyBankIcon />
            </div>
            <p className="text-[#252B42] font-bold text-[40px] tracking-tighter">
              WELCOME!
            </p>
            <p className="text-[#68686b] text-lg tracking-tight">
              Log in to your account and enjoy shopping
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* EMAİL ALANI */}
            <div>
              <label htmlFor="email" className="form-label"></label>
              <input
                className=" form-input"
                placeholder="Email Address..."
                type="email"
                id="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            {/* PASSWORD ALANI */}
            <div>
              <label htmlFor="password" className="form-label"></label>
              <div className="relative">
                <input
                  placeholder="Password..."
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size="xs"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            <div className="flex justify-start items-center">
              <input
                type="radio"
                id="Check"
                name="Check"
                className="mr-2 w-[24px] h-[14px]"
              />{" "}
              <span className="text-sm text-gray-600 font-medium">
                Remember me{" "}
              </span>
            </div>
            <button
              type="submit"
              disabled={isValid || isLoading}
              className={`
                             w-full py-2.5 bg-[#1da0f2] text-lg text-white rounded-lg font-semibold
                             ${
                               isValid || isLoading
                                 ? "opacity-50 cursor-not-allowed"
                                 : "hover:scale-105"
                             }
                            `}
            >
              Sig in
            </button>
            <button className="w-full py-2 border-2 border-[#1da0f2] text-lg text-gray-500 rounded-lg font-semibold">
              <span className="flex justify-center items-center gap-2">
                <FcGoogle className="text-2xl" />
                Sig in with Google
              </span>
            </button>
            <div className="text-sm text-left font-semibold text-[#888]">
              By continuing, you agree to PiggyBank's{" "}
              <span className="text-[#1da0f2] no-underline hover:underline hover:text-red-600">
                Conditions of Use{" "}
              </span>{" "}
              and{" "}
              <span className="text-[#1da0f2] no-underline hover:underline hover:text-red-600">
                {" "}
                Privacy Notice.
              </span>
            </div>
            <p className="text-md text-left font-semibold text-[#888]">
              <FontAwesomeIcon
                icon={faCaretUp}
                rotation={180}
                size="xs"
                style={{ color: "#000000" }}
                className="inline-block align-middle mr-1"
              />
              <span
                onClick={handleShowClick}
                className="text-[#1da0f2] hover:text-red-600 text-sm font-semibold ml-1 no-underline hover:underline cursor-pointer"
              >
                Need help?
              </span>
              {showHelpOptions && (
                <span className="text-[#1da0f2] text-sm ml-[15px] block">
                  <span className="hover:text-red-600 hover:underline">
                    Forgot your password?
                  </span>{" "}
                  <br></br>
                  <span className="hover:text-red-600 hover:underline">
                    Other issues with Sign-in?
                  </span>
                </span>
              )}
            </p>
            <hr></hr>
            <div>
              <div className="text-md text-center font-semibold text-[#888]">
                Don't have an PiggyBank account?
                <Link
                  to="/signup"
                  className="text-[#1da0f2] text-md font-semibold ml-1 no-underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
