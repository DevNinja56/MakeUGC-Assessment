import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContent from "../../components/pages/auth/authContent";
import { FaBullseye } from "react-icons/fa";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ROUTES } from "../../config/routes";
import Logo from "../../components/common/logo";
import { fetchRequest } from "../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import toast from "react-hot-toast";
import { useUserAuth } from "../../hooks/auth-hook";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateUserDetails, loggedInUser } = useUserAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      name: name === "" ? "name is required" : "",
      email: email === "" ? "email is required" : "",
      password: password === "" ? "password is required" : "",
    };
    if (errors.email || errors.password) {
      setError(errors);
      return;
    }
    setLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.AUTH.SIGNUP,
      type: "post",
      body: { name: name, email: email, password: password },
    })
      .then((res) => {
        updateUserDetails(res?.data?.user);
        loggedInUser({
          access: res?.data?.accessToken,
        });
        navigate(ROUTES.HOME);
        toast.success("Account Created Successfully");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen bg-primary relative flex items-center justify-center py-3 lg:py-0">
      <div className="h-full w-full relative min-h-[100vh]">
        <img
          alt="AuthBackgroundImage"
          src="/images/AuthBackgroundImage4k.jpg"
          className="absolute w-full h-full top-0 -left-80 animate-auth-image opacity-20 mix-blend-luminosity hidden 2xl:block"
        />
        <img
          alt="AuthBackgroundImage"
          src="/images/AuthBackgroundImage.svg"
          className="absolute w-full h-full top-0 -left-[88px] animate-auth-image opacity-20 animate-auth-image mix-blend-luminosity hidden lg:block 2xl:hidden"
        />
        <AuthContent />
        <div className="h-[94%] static lg:absolute top-6 right-0 rounded-r-none rounded-[40px] bg-white/40 w-5/12 hidden lg:block"></div>
        <form
          onSubmit={handleSubmit}
          className="static lg:absolute right-0 lg:rounded-r-none top-0 w-11/12 md:w-6/12 lg:w-2/5 h-full mx-auto lg:mx-0 bg-white rounded-xl lg:rounded-[40px] px-5 md:px-8 lg:px-14 xl:px-28 flex flex-col items-center gap-5 xl:gap-6 justify-center py-5 lg:py-0 shadow-lg lg:shadow-none"
        >
          <Logo />
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl text-secondary">
              Seconds To Sign Up!
            </h1>
            <FaBullseye className="text-2xl text-white" />
          </div>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeHolder="Name"
            padding="py-2 lg:py-4"
            value={name}
            errors={error.name}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeHolder="Email"
            padding="py-2 lg:py-4"
            value={email}
            errors={error.email}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeHolder="Password"
            padding="py-3 lg:py-4"
            value={password}
            errors={error.password}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Button
            text="Sign Up"
            padding="py-3 lg:py-4"
            radius="rounded-[51px]"
            className="w-full text-sm lg:text-base font-extrabold"
            isLoader={loading}
            disabled={loading}
            animation
          />
          <h1
            onClick={() => navigate(ROUTES.SIGN_IN)}
            className="text-sm text-gray cursor-pointer lg:mt-6"
          >
            don't have an account{" "}
            <span className="text-primary font-semibold">Login</span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
