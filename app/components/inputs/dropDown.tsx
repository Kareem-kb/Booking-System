'use client';

interface ListItem {
  id: string;
  name: string;
}

interface DropDownProps {
  list: ListItem[];
  label: string;
  name: string;
  className?: string;
}

export default function DropDown({
  list,
  label,
  name,
  className = '',
}: DropDownProps) {
  return (
    <div className={`min-w-20 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
