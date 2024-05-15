import { useForm } from "react-hook-form"
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppDispatch } from "../store";
import { login } from "../action/auth";
import { useState } from "react";

export interface LoginValues {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>();
  const [errorSubmit, setErrorSubmit] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: LoginValues) => {
    const res = await dispatch(login(values)).unwrap();
    if (res.status === 200) {
      navigate("/");
    } else {
      setErrorSubmit(res?.message);
    }
  };
  
  return (
    <form className="flex flex-col items-center justify-center pt-2 h-full px-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-3xl">Welcome back! Glad to see you, Again!</h1>
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="flex flex-col gap-2 w-full mt-8 mx-auto">
          <Input {...register("username", {
            required: "Please insert your username",
            minLength: {
              value: 6,
              message: "Minimum character for username is 6"
            },
            pattern: {
              value: /^\w+$/,
              message: "Username only can be alphanumeric and underscore"
            }
          })}
          placeholder="Enter your username"
          error={errors.username?.message} />
          <Input {...register("password", {
            required: "Please insert your password",
            minLength: {
              value: 6,
              message: "Minimum password is 6"
            }
          })}
          placeholder="Enter your password" type="password"
          error={errors.password?.message} />
        </div>
        <Link className="text-sm text-gray-500 self-end mt-2" to="/register">
          Don't have an account? Register
        </Link>
        {errorSubmit && <p className="text-red-500">{errorSubmit}</p>}
        <div className="flex flex-col w-full">
          <Button className="mt-4">Login</Button>
        </div>
      </div>
    </form>
  )
}