import React from "react";
import Select, { Props } from "react-select";

interface InputSelectProps extends Props {
  error?: string;
}

const InputSelect = React.forwardRef((props: InputSelectProps, ref?: any) => {
  return <>
    <Select classNames={{ control: () => '!bg-gray-200 !min-h-14' }} ref={ref} {...props} />{
    props.error && <p className="text-red-500">{props.error}</p>}
  </>
});

export default InputSelect;
