'use client';

import { useState } from 'react';

interface OpenDayHoursProps {
  day: string;
  label: string;
  onChange: (values: [string, string, string, boolean]) => void;
  defaultOpenFrom?: string;
  defaultOpenTo?: string;
  defaultIsClosed?: boolean;
}


export default function OpenDayHours({
  day,
  label,
  onChange,
  defaultOpenFrom = '09:00',
  defaultOpenTo = '17:00',
  defaultIsClosed = false,
}: OpenDayHoursProps) {
  const [openFrom, setOpenFrom] = useState(defaultOpenFrom);
  const [openTo, setOpenTo] = useState(defaultOpenTo);
  const [isClosed, setIsClosed] = useState(defaultIsClosed);

  // Handle changes and notify parent
  const handleChange = (
    field: 'openFrom' | 'openTo' | 'isClosed',
    value: string | boolean
  ) => {
    if (field === 'openFrom') setOpenFrom(value as string);
    if (field === 'openTo') setOpenTo(value as string);
    if (field === 'isClosed') setIsClosed(value as boolean);

    // Return the current values as an array to the parent
    onChange([day, openFrom, openTo, isClosed]);
  };

  return (
    <div className="relative mb-4 rounded-md border-2">
      <label className="absolute -top-3 left-2 bg-white px-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <span className="w-12 text-gray-500">From</span>
          <div className="flex-1">
            <input
              type="time"
              value={openFrom}
              onChange={(e) => handleChange('openFrom', e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <span className="w-8 text-gray-500">to</span>
          <div className="flex-1">
            <input
              type="time"
              value={openTo}
              onChange={(e) => handleChange('openTo', e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isClosed}
              onChange={(e) => handleChange('isClosed', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-600">Closed</label>
          </div>
        </div>
      </div>
    </div>
  );
}
