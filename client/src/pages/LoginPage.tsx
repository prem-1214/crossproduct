import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../components/UI/InputField";
import Button from "../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/authSchema";

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onsubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    console.log("login Data >>>>", data);
  };

  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <InputField
          label="email"
          type="email"
          {...register("email")}
          error={errors.email}
        />
        <InputField
          label="password"
          type="password"
          {...register("password")}
          error={errors.password}
        />
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
