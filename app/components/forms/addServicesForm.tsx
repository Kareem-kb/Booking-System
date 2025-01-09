'use client';

import { useActionState } from 'react';
import DropDown from '@/app/components/inputs/dropDown';
import InputField from '@/app/components/inputs/inputfield';
import { createServicesAction } from '@/app/actions/serviceActions';

const Times = [
  { id: '1', name: '1 hour' },
  { id: '2', name: '2 hours' },
  { id: '3', name: '3 hours' },
];
const Languages = [
  { id: '1', name: 'EnLanguage' },
  { id: '2', name: 'ArLanguage' },
];

export default function AddServiceForm() {
  const [state, formAction, isPendding] = useActionState(
    createServicesAction,
    null
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-y-6">
        <div>
          {state && (
            <p className="mt-2 text-sm text-red-600">
               {state.errors?.title_en?.[0]}
            </p>
          )}
          <h2 className="text-base/7 font-semibold text-gray-900">
            {state && (
              <>
                {state.errors?.title_en && (
                  <p className="mt-2 text-sm text-red-600">
                    for title en {state.errors.title_en[0]}
                  </p>
                )}
                {state.errors?.title_ar && (
                  <p className="mt-2 text-sm text-red-600">
                    for title ar {state.errors.title_ar[0]}
                  </p>
                )}
                {state.errors?.category && (
                  <p className="mt-2 text-sm text-red-600">
                    for category {state.errors.category[0]}
                  </p>
                )}
                {state.errors?.description_en && (
                  <p className="mt-2 text-sm text-red-600">
                    for descrption en {state.errors.description_en[0]}
                  </p>
                )}
                {state.errors?.description_ar && (
                  <p className="mt-2 text-sm text-red-600">
                    for descrption ar {state.errors.description_ar[0]}
                  </p>
                )}
                {state.errors?.price && (
                  <p className="mt-2 text-sm text-red-600">
                    for price {state.errors.price[0]}
                  </p>
                )}
                {state.errors?.duration && (
                  <p className="mt-2 text-sm text-red-600">
                    for duration {state.errors.duration[0]}
                  </p>
                )}
                {state.errors?.image && (
                  <p className="mt-2 text-sm text-red-600">
                    for images {state.errors.image[0]}
                  </p>
                )}
                {state.errors?.availability && (
                  <p className="mt-2 text-sm text-red-600">
                    for availability {state.errors.availability[0]}
                  </p>
                )}
                {state.success && (
                  <p className="mt-2 text-sm text-green-600">{state.success}</p>
                )}
                {state.error && (
                  <p className="mt-2 text-sm text-green-600">
                    {state.success} for erre genrol
                  </p>
                )}
              </>
            )}
            Add Service
          </h2>
          <p className="text-sm/6 text-gray-600">
            This information will be displayed publicly, so be careful what you
            share.
          </p>
        </div>

        {/* Common Fields */}
        <div className="mt-4 flex gap-x-4">
          <InputField
            name="price"
            placeholder="Price"
            type="text"
            label="Service Price"
          />
          <DropDown list={Times} label="Duration" name="duration" />
        </div>

        {/* Language-Specific Fields */}
        <div>
          <h3 className="mt-6 text-lg font-semibold">English (EN) Details</h3>
          <div className="mt-4 flex gap-x-4">
            <InputField
              name="title_en"
              placeholder="Title in English"
              type="text"
              label="Title (English)"
            />
          </div>
          <div>
            <label
              htmlFor="description_en"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description (English)
            </label>
            <textarea
              id="description_en"
              name="description_en"
              rows={3}
              className="w-full rounded-md border-2 border-gray-400 bg-inherit px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-dashed sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <h3 className="mt-6 text-lg font-semibold">Arabic (AR) Details</h3>
          <div className="mt-4 flex gap-x-4">
            <InputField
              name="title_ar"
              placeholder="Title in Arabic"
              type="text"
              label="Title (Arabic)"
            />
          </div>
          <div>
            <label
              htmlFor="description_ar"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description (Arabic)
            </label>
            <textarea
              id="description_ar"
              name="description_ar"
              rows={3}
              className="w-full rounded-md border-2 border-gray-400 bg-inherit px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-dashed sm:text-sm/6"
            />
          </div>
        </div>
        {/* File Upload */}
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
        <InputField
          name="category"
          placeholder="category"
          type="text"
          label="Service Category"
        />
        {/* Availability Toggle */}
        <div>
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="availability"
              className="peer sr-only"
              defaultChecked={false}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              Availability
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            disabled={isPendding}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
