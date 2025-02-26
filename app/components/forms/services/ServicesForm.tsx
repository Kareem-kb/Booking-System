'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import DropDown from '@/app/components/inputs/dropDown';
import InputField from '@/app/components/inputs/inputfield';
import BranchSelector from '@/app/components/inputs/serviceSelector';
import { createServicesAction } from '@/app/actions/serviceActions';
import { uploadImage } from '@/supabase/storage/client';
import { convertBlobUrlToFile } from '@/helperFns/imgToFile';
import SubmitButton from '../../buttons/SubmitButton';
import { serviceFormSchema } from '@/validation/validateService';
import { toast } from 'sonner';
import { useRouter } from '@/navigation';
import Image from 'next/image';

const Times = [
  { id: '1', name: '1 hour' },
  { id: '2', name: '2 hours' },
  { id: '3', name: '3 hours' },
];

export default function AddServiceForm() {
  const router = useRouter();
  // skipcq: JS-C1002
  const t = useTranslations('Partner.services');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [Pending, setPending] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleFormSubmit = async (formData: FormData, e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrors({});
    try {
      // 1. Validate form data first
      const formValues = {
        branch: formData.get('branch') as string,
        price: formData.get('price') as string,
        duration: formData.get('duration') as string,
        title_en: formData.get('title_en') as string,
        description_en: formData.get('description_en') as string,
        title_ar: formData.get('title_ar') as string,
        description_ar: formData.get('description_ar') as string,
        category: formData.get('category') as string,
        availability: formData.get('availability') as string,
        image: Array.from(formData.getAll('image') as File[]),
      };

      const serviceForm = serviceFormSchema.safeParse(formValues);
      if (!serviceForm.success) {
        setErrors(serviceForm.error.flatten().fieldErrors);
        return;
      }

      // 2. Upload images
      const uploadedImageUrls = await Promise.all(
        imageUrls.map(async (url) => {
          const imageFile = await convertBlobUrlToFile(url);
          const { imageUrl, error } = await uploadImage({
            file: imageFile,
            bucket: 'Services-Images',
          });
          if (error) throw new Error(`Failed to upload image: ${error}`);
          return imageUrl;
        })
      );

      // 3. Prepare final form data
      const serviceData = new FormData();
      serviceData.append('branch', formValues.branch);
      serviceData.append('price', formValues.price);
      serviceData.append('duration', formValues.duration);
      serviceData.append('category', formValues.category);
      serviceData.append('availability', formValues.availability);
      serviceData.append('imageUrl', JSON.stringify(uploadedImageUrls));

      // 4. Add translations
      const translations = [
        {
          language: 'en',
          title: formValues.title_en,
          description: formValues.description_en,
        },
        {
          language: 'ar',
          title: formValues.title_ar,
          description: formValues.description_ar,
        },
      ];
      serviceData.append('translations', JSON.stringify(translations));

      // 5. Submit to server
      const result = await createServicesAction(serviceData);
      if (result.success) {
        toast.success(result.success);
        router.push('/dashboard');
        // Optional: Reset form or redirect
      } else if (result.errors) {
        setErrors(result.errors);
      } else if (result.error) {
        setErrors({ form: [result.error] });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: ['Failed to process form submission'] });
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(new FormData(e.currentTarget), e)}
      className="space-y-8"
    >
      <h1 className="h1">{t('title')}</h1>

      {/* Branch and Basic Info */}
      <div>
        <div className="space-y-4">
          {' '}
          <div>
            {' '}
            <BranchSelector name="branch" label={t('branchSelector')} />
            {errors.branch && (
              <p className="error-message">{errors.branch[0]}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <div>
              {' '}
              <InputField name="price" label={t('price')} />{' '}
              {errors.price && (
                <p className="error-message">{errors.price[0]}</p>
              )}
            </div>
            <div>
              {' '}
              <DropDown list={Times} label={t('duration')} name="duration" />
              {errors.duration && (
                <p className="error-message">{errors.duration[0]}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* English Content */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('englishDetails')}
        </h2>
        <div className="space-y-4">
          <div>
            {' '}
            <InputField name="title_en" label={t('content1')} />
            {errors.title_en && (
              <p className="error-message">{errors.title_en[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('content3')}
            </label>
            <textarea name="description_en" rows={4} />
            {errors.description_en && (
              <p className="error-message">{errors.description_en[0]}</p>
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
            <InputField name="title_ar" label={t('content2')} dir="rtl" />
            {errors.title_ar && (
              <p className="error-message">{errors.title_ar[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              {t('content4')}
            </label>
            <div>
              <textarea name="description_ar" rows={4} dir="rtl" />
              {errors.description_ar && (
                <p className="error-message">{errors.description_ar[0]}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {/* Images and Additional Info */}
          <div>
            {/* Category and Availability */}
            <div className="grid grid-cols-2 gap-4 space-y-6">
              <div>
                <InputField name="category" label={t('content7')} />{' '}
                {errors.category && (
                  <p className="error-message">{errors.category[0]}</p>
                )}
              </div>
              <div className="mx-auto items-baseline">
                <label className="flex cursor-pointer items-center gap-2">
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Availability
                  </span>
                  <input
                    type="checkbox"
                    name="availability"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-dark peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                </label>
              </div>
            </div>
            <div className="mt-4">
              {/* Image Upload */}
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    {t('images')}
                  </label>
                  <div className="mt-1 flex flex-col gap-4">
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-primary-light">
                      <div className="text-center">
                        <div className="mt-4 text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary-dark">
                            <span>{t('uploadImages')}</span>
                            <input
                              name="image"
                              type="file"
                              multiple
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
                  {/* Image Previews */}
                  <div className="mt-2 flex flex-wrap gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="rounded-lg object-cover"
                          width={80}
                          height={80}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrls((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubmitButton text={t('button1')} isPending={Pending} />
    </form>
  );
}
