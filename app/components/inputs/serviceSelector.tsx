'use client';

import { useState, useEffect, useRef } from 'react';
import { getAllBranches } from '@/app/lib/dbBranch';

interface BranchSelectorProps {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  onChange?: (branchId: string) => void;
}

export default function BranchSelector({
  name,
  label,
  error,
  className = '',
  onChange,
}: BranchSelectorProps) {
  const [branches, setBranches] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setIsLoading(true);
        const branchData = await getAllBranches();
        setBranches(branchData);
        setLoadError(null);
      } catch (err) {
        setLoadError('Failed to load branches. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    setIsOpen(false);
    if (onChange) onChange(branchId);
  };

  return (
    <div className={`space-y-1 ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isLoading}
          className="flex w-full items-center justify-between rounded-md border border-primary bg-primary-light px-3 py-2 text-sm text-gray-700 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-gray-500"
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
                  d="M4 12a8 8 0 018-8V0C5.37258 0 0 5.37258 0 12h4zm2 5.29102A7.96358 7.96358 0 014 12H0c0 3.04222 1.13403 5.82435 3 7.93762l3-2.6466z"
                />
              </svg>
              Loading...
            </div>
          ) : selectedBranch ? (
            (branches.find((b) => b.id === selectedBranch)?.id ??
            'Select Branch')
          ) : (
            'Select Branch'
          )}
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <input type="hidden" name={name} value={selectedBranch ?? ''} />

        {isOpen && !isLoading && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ul className="max-h-60 overflow-auto py-1 text-base sm:text-sm">
              {branches.map((branch) => (
                <li
                  key={branch.id}
                  className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-primary-light"
                  onClick={() => handleSelect(branch.id)}
                >
                  <span className="block truncate">{branch.id}</span>
                  {selectedBranch === branch.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {(error || loadError) && (
        <p className="mt-1 text-sm text-red-600">{error || loadError}</p>
      )}
    </div>
  );
}
