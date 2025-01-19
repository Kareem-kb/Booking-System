'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { convertBlobUrlToFile } from '@/app/lib/utils';
import { uploadImage } from '@/supabase/storage/client';
import BranchAndService from '@/app/components/inputs/branchandservice';
import { createStaffAction } from '@/app/actions/staffActions';

export default function StaffForm() {
  const [imageUrl, setImageUrl] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file); // Create a URL for the single file
      setImageUrl(newImageUrl); // Set the single image URL
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (!imageUrl) {
      console.error('No image selected');
      return;
    }

    // Upload the single image and get the URL
    const imageFile = await convertBlobUrlToFile(imageUrl);
    const { imageUrl: uploadedImageUrl, error } = await uploadImage({
      file: imageFile,
      bucket: 'Services-Images',
    });

    if (error) {
      console.log(error);
      return;
    }

    // Attach the single image URL to form data
    formData.append('imageUrl', uploadedImageUrl);
    // Remove the original `File` object from the FormData
    formData.delete('image');

    // Append translations to the FormData
    const translations = [
      {
        language: 'en',
        name: formData.get('Name_en') as string,
        aboutMe: formData.get('aboutMe_en') as string,
      },
      {
        language: 'ar',
        name: formData.get('Name_ar') as string,
        aboutMe: formData.get('aboutMe_ar') as string,
      },
    ];
    formData.append('translations', JSON.stringify(translations));
    formData.delete('Name_en');
    formData.delete('Name_ar');
    formData.delete('aboutMe_en');
    formData.delete('aboutMe_ar');

    await createStaffAction(formData);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Create Staff</h1>
      <form action={handleFormSubmit} className="space-y-6">
        {/* Staff Name */}
        <input type="hidden" name="role" value="staff" />
        <div>
          <label
            htmlFor="staffName"
            className="block text-sm font-medium text-gray-700"
          >
            Staff Name (English)
          </label>
          <input
            type="text"
            name="Name_en"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* Staff Name */}
        <div>
          <label
            htmlFor="staffName"
            className="block text-sm font-medium text-gray-700"
          >
            Staff Name (Arabic)
          </label>
          <input
            type="text"
            name="Name_ar"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* About Me */}
        <div>
          <label
            htmlFor="aboutMe"
            className="block text-sm font-medium text-gray-700"
          >
            About the Staff (English)
          </label>
          <textarea
            name="aboutMe_en"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="aboutMe"
            className="block text-sm font-medium text-gray-700"
          >
            About the Staff (Arabic)
          </label>
          <textarea
            name="aboutMe_ar"
            rows={3}
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
            ref={imageInputRef}
            onChange={handleImageChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            SVG, PNG, JPG, or GIF (MAX. 800x400px).
          </p>
        </div>
        <div>
          <BranchAndService name1="branchId" name2="serviceId" />
        </div>
        {/* Staff Services */}

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
