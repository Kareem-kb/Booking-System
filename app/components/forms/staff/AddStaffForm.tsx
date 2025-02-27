'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { convertBlobUrlToFile } from '@/helperFns/imgToFile';
import { uploadImage } from '@/supabase/storage/client';
import BranchAndService from '@/app/components/inputs/staffSelector';
import { createStaffAction } from '@/app/actions/staffActions';
import InputField from '@/app/components/inputs/inputfield';
import SubmitButton from '../../buttons/SubmitButton';
import { StaffFormSchema } from '@/validation/validateStaff';
import { toast } from 'sonner';
import { useRouter } from '@/navigation';
import Image from 'next/image';

export default function StaffForm() {
  const t = useTranslations('Partner.staff');
  const router = useRouter();
  const [pending, isPending] = useState(false);
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

  const handleFormSubmit = async (formData: FormData, e: React.FormEvent) => {
    e.preventDefault();
    isPending(true);
    setErrors({});
    // console.log('im here');
    try {
      const formValues = {
        branchId: formData.get('branchId') as string,
        servicesId: formData.getAll('serviceId') as string[],
        email: formData.get('email') as string,
        Name_en: formData.get('Name_en') as string,
        aboutMe_en: formData.get('aboutMe_en') as string,
        Name_ar: formData.get('Name_ar') as string,
        aboutMe_ar: formData.get('aboutMe_ar') as string,
        image: formData.get('image') as File,
      };
      // Validate form data
      const serviceForm = StaffFormSchema.safeParse(formValues);
      if (!serviceForm.success) {
        console.error('Validation failed:', serviceForm.error);
        setErrors(serviceForm.error.flatten().fieldErrors);
        isPending(false);
        return;
      }

      // Handle image upload
      if (imageUrl) {
        const imageFile = await convertBlobUrlToFile(imageUrl);
        const { imageUrl: uploadedImageUrl, error: uploadError } =
          await uploadImage({
            file: imageFile,
            bucket: 'Services-Images',
          });

        if (uploadError) {
          console.error('Image upload failed:', uploadError);
          setErrors({ image: [uploadError] });
          isPending(false);
          return;
        }

        formData.append('imageUrl', uploadedImageUrl);
      }
      formData.delete('image');

      // Prepare translations
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
      ['Name_en', 'Name_ar', 'aboutMe_en', 'aboutMe_ar'].forEach((field) =>
        formData.delete(field)
      );

      // Submit to server
      const result = await createStaffAction(formData);

      if (result.error) {
        toast.error(result.error);
        setErrors({ form: [result.error] });
      } else if (result.success) {
        toast.success(result.success);
        isPending(false);
        setErrors({});
        // Optional: Reset form or redirect
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.error('An unexpected error occurred. Please try again later.');
      setErrors({ form: ['An unexpected error occurred.'] });
    } finally {
      isPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(new FormData(e.currentTarget), e)}
      className="mb-8 space-y-8"
    >
      <h1 className="h1">{t('title')}</h1>

      <input type="hidden" name="role" value="STAFF" />

      {/* English Content */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('englishDetails')}
        </h2>
        <div className="space-y-4">
          <div>
            <InputField name="Name_en" label={t('nameEn')} />
            {errors.Name_en && (
              <p className="error-message">{errors.Name_en[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('aboutMeEn')}
            </label>
            <textarea name="aboutMe_en" rows={4} />
            {errors.aboutMe_en && (
              <p className="error-message">{errors.aboutMe_en[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Arabic Content */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('arabicDetails')}
        </h2>
        <div className="space-y-4">
          <div>
            <InputField name="Name_ar" label={t('nameAr')} dir="rtl" />
            {errors.Name_ar && (
              <p className="error-message">{errors.Name_ar[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('aboutMeAr')}
            </label>
            <textarea name="aboutMe_ar" rows={4} dir="rtl" />
            {errors.aboutMe_ar && (
              <p className="error-message">{errors.aboutMe_ar[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <div className="grid gap-4 space-y-6">
          <div>
            <InputField
              name="email"
              label={t('email')}
              errorHandling={errors.email?.join(',')}
            />
            {errors.email && <p className="error-message">{errors.email[0]}</p>}
          </div>
          <BranchAndService nameBranch="branchId" nameServices="serviceId" />
        </div>

        <div className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('profileImage')}
            </label>
            <div className="mt-1 flex flex-col gap-4">
              <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-primary-light">
                <div className="text-center">
                  <div className="mt-4 text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary-dark">
                      <span>{t('uploadImage')}</span>
                      <input
                        name="image"
                        type="file"
                        className="sr-only"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1 text-sm">{t('DragAndDrop')}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    {t('imageHint')}
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="error-message">{errors.image[0]}</p>
              )}
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="mt-2">
                <div className="relative inline-block">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    className="rounded-lg object-cover"
                    width={80}
                    height={80}
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute -right-2 -top-2 rounded-full bg-gray-500 p-1 text-white shadow-sm hover:bg-red-600"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SubmitButton text={t('submit')} isPending={pending} />
    </form>
  );
}
