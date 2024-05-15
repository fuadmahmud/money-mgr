import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import InputSelect from "../components/InputSelect";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchCategories, postExpanses } from "../action/expanses";
import InputDate from "../components/InputDate";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";

export interface ExpenseValue {
  date: string;
  amount: number;
  category: string;
  note: string;
}

export default function Expense() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExpenseValue>();
  const { categories } = useAppSelector(state => state.expanses);
  const username = useLocalStorage('username');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: ExpenseValue) => {
    const res = await dispatch(postExpanses({username: username || '', data: values})).unwrap();
    if (res.status === 200) {
      const timeout = setTimeout(() => navigate("/"), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  return (
    <form className="h-full bg-red-500 flex flex-col md:mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 h-1/4">
        <h1 className="text-white pb-4 text-2xl font-bold text-left">How much did you spend?</h1>
        <div className="flex flex-row gap-2 items-center">
          <span className="font-bold text-lg text-white ">Rp.</span>
          <div className="flex flex-col">
            <Input className="bg-transparent border-b border-b-white text-white" {...register("amount", {
              required: {
                value: true,
                message: "Please insert your amount"
              }
            })} type="number" />
            {errors.amount?.message && <p className="text-white text-sm">{errors.amount?.message}</p>}
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-full p-4 rounded-t-lg flex flex-col justify-between lg:items-center">
        <div className="flex flex-col gap-2 lg:w-3/4">
          <InputDate onChange={(date) => {
            if (date) {
              setValue("date", format(date, 'dd/MM/yyyy'))
            };
          }} />
          <InputSelect options={categories} onChange={(opt: any) => setValue('category', opt?.value)} />
          {errors.category?.message && <p className="text-red-500 text-sm">{errors.amount?.message}</p>}
          <Input {...register("note")} placeholder="Please insert note or description" />
        </div>
        <div className="flex flex-col gap-2 lg:w-3/4">
          {/* <Button variant="secondary">Add new category</Button> */}
          <Button>Save</Button>
        </div>
      </div>
    </form>
  )
}