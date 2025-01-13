'use client';
import React, { useState } from 'react';

export default function StaffForm() {
  const [staffServices, setStaffServices] = useState<{ serviceId: string }[]>(
    []
  );

  const addService = () => {
    setStaffServices([...staffServices, { serviceId: '' }]);
  };

  const removeService = (index: number) => {
    setStaffServices(staffServices.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Create Staff</h1>
      <form className="space-y-6">
        {/* Staff Name */}
        <div>
          <label
            htmlFor="staffName"
            className="block text-sm font-medium text-gray-700"
          >
            Staff Name
          </label>
          <input
            type="text"
            name="staffName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Branch ID */}
        <div>
          <label
            htmlFor="branchId"
            className="block text-sm font-medium text-gray-700"
          >
            Branch ID
          </label>
          <input
            type="text"
            name="branchId"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* About Me */}
        <div>
          <label
            htmlFor="aboutMe"
            className="block text-sm font-medium text-gray-700"
          >
            About the Staff
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Upload file
          </label>
          <input
            name="image"
            type="file"
            multiple
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            SVG, PNG, JPG, or GIF (MAX. 800x400px).
          </p>
        </div>
        {/* Staff Services */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Staff Services
          </h2>
          {staffServices.map((service, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor={`serviceId-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Service ID
                </label>
                <input
                  type="text"
                  id={`serviceId-${index}`}
                  name={`staffServices[${index}].serviceId`}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeService(index)}
                className="mt-6 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            + Add Service
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Create Staff
          </button>
        </div>
      </form>
    </div>
  );
}
