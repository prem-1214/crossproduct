import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../components/UI/InputField";
import Button from "../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas/authSchema";
import { useRegisterMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { registerSuccess } from "../features/auth/authSlice";

function RegisterPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const [useregister] = useRegisterMutation();
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
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <Button label="Register" type="submit" />
      </form>
    </div>
  );
}

export default RegisterPage;
