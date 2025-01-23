'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import DropDown from '@/app/components/inputs/dropDown';
import InputField from '@/app/components/inputs/inputfield';
import BranchSelector from '@/app/components/inputs/branchSelector';
import { createServicesAction } from '@/app/actions/serviceActions';
import { uploadImage } from '@/supabase/storage/client';
import { convertBlobUrlToFile } from '@/app/lib/utils';

const Times = [
  { id: '1', name: '1 hour' },
  { id: '2', name: '2 hours' },
  { id: '3', name: '3 hours' },
];

export default function AddServiceForm() {
  const t = useTranslations('Partner.addService');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      // Upload images and get URLs
      const uploadedImageUrls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: 'Services-Images',
        });
        if (error) throw error;
        uploadedImageUrls.push(imageUrl);
      }

      // Prepare form data
      formData.append('imageUrl', JSON.stringify(uploadedImageUrls));
      formData.delete('image');

      const translations = [
        {
          language: 'en',
          title: formData.get('title_en') as string,
          description: formData.get('description_en') as string,
        },
        {
          language: 'ar',
          title: formData.get('title_ar') as string,
          description: formData.get('description_ar') as string,
        },
      ];

      formData.append('translations', JSON.stringify(translations));

      // Clean up form data
      ['title_en', 'title_ar', 'description_en', 'description_ar'].forEach(
        (field) => formData.delete(field)
      );

      const result = await createServicesAction(formData);
      if (result.error) {
        setErrors(result.error ? { form: [result.error] } : {});
      } else {
        setErrors({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: ['Failed to submit form'] });
    }
  };

  return (
    <form action={handleFormSubmit} className="space-y-6">
      <h1 className="h1">{t('title')}</h1>

      {/* Branch and Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            {t('selectBranch')}
          </label>
          <BranchSelector name="branch" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="price"
            type="text"
            label={t('price')}
            placeholder=""
          />
          <DropDown list={Times} label={t('duration')} name="duration" />
        </div>
      </div>

      {/* English Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('englishDetails')}
        </h2>
        <div className="space-y-4">
          <InputField
            name="title_en"
            type="text"
            label={t('titleEn')}
            placeholder=""
          />
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('descriptionEn')}
            </label>
            <textarea
              name="description_en"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('descriptionPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Arabic Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('arabicDetails')}
        </h2>
        <div className="space-y-4">
          <InputField
            placeholder=""
            name="title_ar"
            type="text"
            label={t('titleAr')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('descriptionAr')}
            </label>
            <textarea
              name="description_ar"
              rows={4}
              dir="rtl"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('descriptionPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Images and Category */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('images')}
            </label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                  >
                    <span>{t('uploadImages')}</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      multiple
                      className="sr-only"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">{t('orDragAndDrop')}</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  {t('imageHint')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="category"
              type="text"
              label={t('category')}
              placeholder=""
            />
            <div className="flex items-end">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="availability"
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {t('availability')}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {t('formErrors')}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc space-y-1 pl-5">
                  {Object.entries(errors).map(([field, messages]) => (
                    <li key={field}>{messages[0]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
}
