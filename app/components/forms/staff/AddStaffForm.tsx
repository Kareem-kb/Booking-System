'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { convertBlobUrlToFile } from '@/app/lib/utils';
import { uploadImage } from '@/supabase/storage/client';
import BranchAndService from '@/app/components/inputs/branchandservice';
import { createStaffAction } from '@/app/actions/staffActions';
import InputField from '@/app/components/inputs/inputfield';

export default function StaffForm() {
  const t = useTranslations('Partner.staff');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [imageUrl, setImageUrl] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (!imageUrl) {
        setErrors({ image: ['Profile image is required'] });
        return;
      }

      const imageFile = await convertBlobUrlToFile(imageUrl);
      const { imageUrl: uploadedImageUrl, error: uploadError } = await uploadImage({
        file: imageFile,
        bucket: 'Staff-Images',
      });

      if (uploadError) {
        setErrors({ image: [uploadError.message] });
        return;
      }

      formData.append('imageUrl', uploadedImageUrl);
      formData.delete('image');

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
      ['Name_en', 'Name_ar', 'aboutMe_en', 'aboutMe_ar'].forEach(field => 
        formData.delete(field)
      );

      const result = await createStaffAction(formData);
      if (result.error) {
        setErrors(result.error.details || {});
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
      
      <input type="hidden" name="role" value="staff" />

      <div className="space-y-6">
        {/* English Content */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">{t('englishDetails')}</h2>
          <div className="space-y-4">
            <InputField
              name="Name_en"
              type="text"
              label={t('nameEn')}
              error={errors.Name_en?.[0]}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('aboutMeEn')}
              </label>
              <textarea
                name="aboutMe_en"
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.aboutMe_en && (
                <p className="error-message">{errors.aboutMe_en[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Arabic Content */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">{t('arabicDetails')}</h2>
          <div className="space-y-4">
            <InputField
              name="Name_ar"
              type="text"
              label={t('nameAr')}
              dir="rtl"
              error={errors.Name_ar?.[0]}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('aboutMeAr')}
              </label>
              <textarea
                name="aboutMe_ar"
                rows={4}
                dir="rtl"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.aboutMe_ar && (
                <p className="error-message">{errors.aboutMe_ar[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Common Fields */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="space-y-4">
            <InputField
              name="email"
              type="email"
              label={t('email')}
              error={errors.email?.[0]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profileImage')}
              </label>
              <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark">
                      <span>{t('uploadImage')}</span>
                      <input
                        name="image"
                        type="file"
                        className="sr-only"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">{t('orDragAndDrop')}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">{t('imageHint')}</p>
                </div>
              </div>
              {errors.image && (
                <p className="error-message">{errors.image[0]}</p>
              )}
            </div>

            <BranchAndService name1="branchId" name2="serviceId" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          {t('submit')}
        </button>
      </div>
    </form>
  );
}
