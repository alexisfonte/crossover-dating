import { cn } from "../../lib/utils";

const RadioInput = ({ option, onBlur, onChange }) => {
  const { name, value, id, labelText, checked } = option;
  return (
    <div className="">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        className="hidden peer"
      />
      <label htmlFor={id} className={cn(
          checked
            ? "bg-[#20abc6] hover:border-[#f7f907]"
            : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
          "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 peer-active:ring-2 peer-active:ring-[#20abc6] peer-active:ring-offset-2 display-none"
        )}>{labelText}</label>
    </div>
  );
};
export default RadioInput;
