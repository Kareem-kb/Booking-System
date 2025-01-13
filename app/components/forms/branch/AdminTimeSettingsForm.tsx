import React, { useState } from 'react';
import { initialDays } from '@/app/lib/lists';
import { operatingHoursSchema } from '@/app/validation/branch';

const AdminTimeSettingsForm = ({ onNext, onPrevious }: any) => {
  const [days, setDays] = useState(initialDays);

  // Handle changes to opening or closing time
  const handleTimeChange = (
    index: number,
    field: 'openTime' | 'closeTime',
    value: string
  ) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };
  // Handle form submission
  const [errors, setErrors] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the entire `days` array
    const result = operatingHoursSchema.safeParse(days);

    if (!result.success) {
      // Flatten errors and map them to the corresponding day
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});
      onNext({ operatingHours: result.data }); // Pass validated data to the next step
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {days.map((day, index) => (
        <div key={day.dayOfWeek} className="rounded border p-4">
          <h3 className="text-lg font-semibold">{day.name}</h3>
          <div className="space-y-2">
            <label className="block">
              Opening Time:
              <input
                type="time"
                value={day.openTime}
                onChange={(e) =>
                  handleTimeChange(index, 'openTime', e.target.value)
                }
                className="ml-2 rounded border p-1"
              />
            </label>
            <label className="block">
              Closing Time:
              <input
                type="time"
                value={day.closeTime}
                onChange={(e) =>
                  handleTimeChange(index, 'closeTime', e.target.value)
                }
                className="ml-2 rounded border p-1"
              />
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={day.isClosed}
                onChange={(e) =>
                  setDays((prev) =>
                    prev.map((d, i) =>
                      i === index ? { ...d, isClosed: e.target.checked } : d
                    )
                  )
                }
              />
              Closed
            </label>
          </div>
        </div>
      ))}
      {Object.entries(errors).map(([field, message]) => (
        <p key={field} className="text-sm text-red-600">
          {message as string}
        </p>
      ))}
      <div className="flex justify-between">
        {' '}
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
        >
          Previous{' '}
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AdminTimeSettingsForm;
