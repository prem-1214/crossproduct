import { useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/UI/InputField";
import Button from "../../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../../features/auth/authSchema";
import { useLoginMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onsubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      const response = await login(data).unwrap();
      const user = response.data?.user;
      const accessToken = response.data?.accessToken;

      if (!user) {
        throw new Error("User data not found in response");
      }
      console.log("login Data >>>>", response.data.accessToken);
      dispatch(loginSuccess({ user, accessToken }));
      // const localuser = localStorage.getItem("user");
      // console.log("local user : >>> ", localuser);
      navigate("/");
    } catch (error: unknown) {
      setError(error?.data?.message || "Login failed");
      console.log("Login failed ", error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center m-10">
      <h2 className="text-2xl font-bold mb-16">Login yourself</h2>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col gap-5 w-lg m-5 "
      >
        {error && (
          <p className="text-red-600 font-medium text-center">{error}</p>
        )}
        <InputField
          label="email"
          type="email"
          // placeholder="Enter your email . . ."
          {...register("email")}
          error={errors.email}
        />
        <InputField
          label="password"
          type="password"
          // placeholder="Password"
          {...register("password")}
          error={errors.password}
        />
        <Button label="Login" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in ..." : "login"}
        </Button>
        <div className="flex justify-center gap-5 ">
          <h4>Don't have an account ?</h4>
          <NavLink to={"/register"} className={`text-blue-600`}>
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
