import React, { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef((props: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
  return (
    <>
      <input ref={ref} className={["bg-gray-200 rounded w-full min-h-14 p-4", props.className].filter(Boolean).join(" ")} {...props} />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </>
  );
})

export default Input;
