interface InputFieldProps {
  label: string;
  name: string;
  errorHandling?: string;
  dir?: string;
  defaultValue?: string;
  readOnly?: boolean;
}
export default function InputField({
  label,
  name,
  errorHandling,
  dir,
  defaultValue,
  readOnly,
}: InputFieldProps) {
  return (
    <div className="min-h-16 w-full">
      <label
        htmlFor="username"
        className="mb-1 block text-sm font-medium text-gray-900"
      >
        {label}
        <input
          name={name}
          type="text"
          defaultValue={defaultValue}
          dir={dir}
          readOnly={readOnly}
        />
      </label>
      <div className="h-5">
        {errorHandling && <p className="error-message">{errorHandling}</p>}
      </div>
    </div>
  );
}
