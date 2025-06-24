import type { InputHTMLAttributes, JSX } from "react";
import type { FieldError } from "react-hook-form";

type InputFieldProps = {
  label?: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  error,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <div className="mb-4 ">
      {label && (
        <label className=" text-lg mb-3 flex justify-center ">{label}</label>
      )}
      <input
        {...props}
        className={`w-full border outline-none text-center border-t-0 border-x-0 border-b-black ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
