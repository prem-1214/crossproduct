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
    <div className="mb-4">
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        {...props}
        className={`w-full border rounded outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
