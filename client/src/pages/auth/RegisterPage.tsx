import { useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/UI/InputField";
import Button from "../../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterInput,
} from "../../features/auth/authSchema";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { registerSuccess } from "../../features/auth/authSlice";

function RegisterPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const [useregister] = useRegisterMutation();
  const [error, serError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onsubmit: SubmitHandler<RegisterInput> = async (
    data: RegisterInput
  ) => {
    try {
      const response = await useregister(data).unwrap();
      console.log("register data", response.data);
      dispatch(registerSuccess(response.data));
      navigate("/login");
    } catch (error: unknown) {
      serError(error?.data?.message || "Registration failed");
      console.log("Error during registration", error);
    }
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center m-10">
      <h2 className="text-2xl font-bold mb-16">Register yourself</h2>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col gap-5 w-lg m-5 "
      >
        {error && (
          <p className="text-red-500 font-medium text-center">{error}</p>
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
        <Button label="Register" type="submit" />
        <div className="flex justify-center gap-5 ">
          <h4>Already have an account ?</h4>
          <NavLink to={"/login"} className={`text-blue-600`}>
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
