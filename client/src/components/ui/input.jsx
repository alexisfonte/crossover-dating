import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";

const Input = ({
  type,
  labelText,
  placeholder,
  name,
  onChange,
  onBlur,
  value,
  errorText,
  touched,
  className,
  errors
}) => {
  return (
    <div className={className}>
      {labelText && <label
        htmlFor={name}
        className="block text-sm font-medium leading-6"
      >
        {labelText}
      </label>}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          className={cn(errorText ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500" : "", "bg-transparent block w-full rounded-md border py-1.5 pl-3 pr-10 focus:outline-none focus:border-[#20abc6] focus:box-shadow-[#20abc6]  sm:text-sm sm:leading-6")}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid="true"
          aria-describedby={`${name}-error`}
        />
        {touched && errors &&
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        }
      </div>
     {touched && errors && <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
        {errorText}
      </p>}
    </div>
  );
};
export default Input;
