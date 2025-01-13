'use client';

import { useState } from 'react';
import { branchSchema } from '@/app/validation/branch';
import InputField from '@/app/components/inputs/inputfield';

export default function BasicInfoForm({ onNext, initialData }: any) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const result = branchSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      onNext({ basicInfo: result.data });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Basic Branch Information
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          type="text"
          name="name"
          label="Branch Name"
          defaultValue={initialData.name}
          placeholder=""
        />
        <InputField
          name="contactEmail"
          label="Branch Email"
          type="email"
          defaultValue={initialData.contactEmail}
          placeholder=""
        />
        <InputField
          name="phoneNumber"
          placeholder=""
          label="Branch Phone Number"
          defaultValue={initialData.phoneNumber}
          type="number"
        />
        <InputField
          placeholder=""
          name="website"
          label="Branch Website"
          type="url"
          defaultValue={initialData.website}
        />
        <InputField
          placeholder=""
          type="text"
          name="address"
          label="Address"
          defaultValue={initialData.address}
          classname="col-span-2"
        />
      </div>
      {Object.entries(errors).map(([field, message]) => (
        <p key={field} className="text-sm text-red-600">
          {message as string}
        </p>
      ))}
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Next
      </button>
    </form>
  );
}
