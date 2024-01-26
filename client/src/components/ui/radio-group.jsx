import RadioInput from "./radio-input"

const RadioGroup = ({labelText, placeholder, options, onBlur, onChange, touched, errors }) => {
  return (
    <div className="w-full">
        <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6">{labelText}</h2>
        </div>
        <div className="mt-2">
            <span className="sr-only">{placeholder}</span>
            <div className="grid grid-cols-3 gap-3">
                {options && options.map((option) => (
                    <RadioInput key={option.name} option={option} onBlur={onBlur} onChange={onChange}/>
                ))}
            </div>
        </div>
        {touched && errors && <p className="mt-2 text-sm text-red-600">
        {errors}
      </p>}
    </div>
  )
}
export default RadioGroup