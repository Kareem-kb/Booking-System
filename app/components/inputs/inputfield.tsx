interface InputFieldProps {
  label: string;
  name: string;
  errorHandling?: string;
  dir?: string;
  defaultValue?: string;
  readOnly?: boolean;
  autoComplete?: string;
}
export default function InputField({
  label,
  name,
  errorHandling,
  dir,
  defaultValue,
  readOnly,
  autoComplete,
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
          autoComplete={autoComplete}
        />
      </label>
      <div className="h-5">
        {errorHandling && <p className="error-message">{errorHandling}</p>}
      </div>
    </div>
  );
}
