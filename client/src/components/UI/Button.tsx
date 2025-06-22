import type { ButtonHTMLAttributes, JSX } from "react";

type ButtonProps = {
  label: string;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, loading, ...props }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button
        {...props}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 "
      >
        {loading ? "Processing" : label}
      </button>
    </div>
  );
};

export default Button;
