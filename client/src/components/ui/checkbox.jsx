const Checkbox = ({
  name,
  id,
  onBlur,
  onChange,
  checked,
  labelText,
  touched,
  errors,
}) => {
  return (
    <div className="relative flex items-start w-full">
      <div className="flex h-6 items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          onBlur={onBlur}
          onChange={onChange}
          checked={checked}
          className="h-4 w-4 rounded border-gray-300 text-[#20abc6] focus:ring-[#20abc6]"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={id} className="font-medium">
          {labelText}
        </label>
        {touched && errors &&
        <p id={id} className="text-gray-500">
          {errors}
        </p>
        }
      </div>
    </div>
  );
};
export default Checkbox;
