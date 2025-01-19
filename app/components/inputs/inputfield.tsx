interface InputFieldProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  classname?: string;
  defaultValue?: string;
}
export default function InputField({
  label,
  placeholder,
  name,
  type,
  classname,
  defaultValue,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="username"
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${classname} w-full min-w-7 rounded-md py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6`}
      />
    </div>
  );
}
