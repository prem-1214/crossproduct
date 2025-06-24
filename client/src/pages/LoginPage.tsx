import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../components/UI/InputField";
import Button from "../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/authSchema";
import { useLoginMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const [login] = useLoginMutation();
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
      console.log("login Data >>>>", response.data);
      dispatch(loginSuccess({ user, accessToken }));
      // const localuser = localStorage.getItem("user");
      // console.log("local user : >>> ", localuser);
      navigate("/");
    } catch (error) {
      console.log("Login failed ", error);
    }
  };

  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <InputField
          label="email"
          type="email"
          placeholder="Enter your email . . ."
          {...register("email")}
          error={errors.email}
        />
        <InputField
          label="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password}
        />
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
