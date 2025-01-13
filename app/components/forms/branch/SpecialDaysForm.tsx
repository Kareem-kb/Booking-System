import React, { useState } from 'react';
import { specialClosuresSchema } from '@/app/validation/branch';

const BranchSpecialClosureForm = ({ onSubmit }: any) => {
  const [closures, setClosures] = useState([
    { date: '', closeReason: '' }, // Initial empty closure
  ]);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // Add a new closure row
  const addClosure = () => {
    setClosures([...closures, { date: '', closeReason: '' }]);
  };

  // Handle changes to date or reason
  const handleClosureChange = (
    index: number,
    field: 'date' | 'closeReason',
    value: string
  ) => {
    const updatedClosures = [...closures];
    updatedClosures[index][field] = value;
    setClosures(updatedClosures);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = specialClosuresSchema.safeParse(closures);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});
      onSubmit({ specialClosures: result.data }); // Pass validated data to the next step
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {closures.map((closure, index) => (
        <div key={index} className="rounded border p-4">
          <h3 className="text-lg font-semibold">Closure {index + 1}</h3>
          <div className="space-y-2">
            <label className="block">
              Date:
              <input
                type="date"
                value={closure.date}
                onChange={(e) =>
                  handleClosureChange(index, 'date', e.target.value)
                }
                className="ml-2 rounded border p-1"
              />
              {errors[index]?.date && (
                <p className="text-sm text-red-600">{errors[index].date}</p>
              )}
            </label>
            <label className="block">
              Reason for Closure:
              <input
                type="text"
                value={closure.closeReason}
                onChange={(e) =>
                  handleClosureChange(index, 'closeReason', e.target.value)
                }
                className="ml-2 rounded border p-1"
              />
              {errors[index]?.closeReason && (
                <p className="text-sm text-red-600">
                  {errors[index].closeReason}
                </p>
              )}
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addClosure}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Add Another Closure
      </button>
      <button
        type="submit"
        className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Save Closures
      </button>
    </form>
  );
};

export default BranchSpecialClosureForm;
