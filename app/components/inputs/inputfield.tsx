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
    <div className="w-full min-h-16">
      <label
        htmlFor="username"
        className="mb-1 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${classname} `}
      />
    </div>
  );
}
