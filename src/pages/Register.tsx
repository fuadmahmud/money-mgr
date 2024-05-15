import { useForm } from "react-hook-form"
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { fetchRegister } from "../action/register";
import { useNavigate } from "react-router-dom";

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterValues>();
  const [submitError, setSubmitError] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: RegisterValues) => {
    const res = await dispatch(fetchRegister(values)).unwrap();
    if (res?.status === 200) {
      navigate("/");
    } else {
      setSubmitError(res?.message);
    }
  };
  
  return (
    <form className="flex flex-col items-center justify-center pt-7 px-4 h-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-3xl">Hello! Register to get started</h1>
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="flex flex-col gap-2 w-full mt-8">
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
          <Input {...register("email", {
            required: "Please insert your email",
            minLength: {
              value: 6,
              message: "Minimum character for email is 6"
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please insert email correctly"
            }
          })}
          placeholder="Enter your email"
          error={errors.email?.message} />
          <Input {...register("password", {
            required: "Please insert your password",
            minLength: {
              value: 6,
              message: "Minimum password is 6"
            }
          })}
          placeholder="Enter your password" type="password"
          error={errors.password?.message} />
          <Input {...register("rePassword", {
            required: true,
            validate: (val) => getValues("password") === val || "Password mismatch" 
          })}
          placeholder="Re-enter your password"
          type="password"
          error={errors.rePassword?.message} />
        </div>
        {submitError && <p className="text-red-500">{submitError}</p>}
        <div className="flex flex-col w-full">
          <Button className="mt-4">Register</Button>
          <Button className="mt-4" variant="secondary">Cancel</Button>
        </div>
      </div>
    </form>
  )
}