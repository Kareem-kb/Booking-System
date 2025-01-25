'use client';

import { useState } from 'react';

interface ListItem {
  id: string;
  name: string;
}

interface DropDownProps {
  list?: ListItem[];
  label: string;
  name: string;
  error?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading?: boolean;
}

export default function DropDown({
  list,
  label,
  name,
  error,
  className = '',
  onChange,
  isLoading = false,
}: DropDownProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select id={name} name={name} onChange={onChange} disabled={isLoading}>
          <option value="">{isLoading ? 'Loading...' : ''}</option>
          {list?.map((item) => (
            <option key={item.id} value={item.id} className="py-2">
              {item.name}
            </option>
          ))}
        </select>

        {/* Loading or Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          {isLoading ? (
            <svg
              className="h-5 w-5 animate-spin text-gray-400"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
