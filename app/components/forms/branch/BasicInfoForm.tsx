'use client';

import { useState } from 'react';
import { branchFormSchema, type BranchFormSchema } from '@/validation/branch';
import InputField from '@/app/components/inputs/inputfield';
import { useTranslations } from 'next-intl';

interface Props {
  onNext: (data: { basicInfo: BranchFormSchema }) => void;
  initialData: Partial<BranchFormSchema>;
}

export default function BasicInfoForm({ onNext, initialData }: Props) {
  const translations = useTranslations('Partner.branchInfo');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const result = branchFormSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onNext({ basicInfo: result.data });
  };

  return (
    // skipcq: JS-0417
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="h1">{translations('title')}</h1>
      <div className="grid sm:grid-cols-2 sm:gap-4">
        {/* English Branch Name */}
        <div>
          <InputField
            type="text"
            name="nameEn"
            label={translations('branchNameEn')}
            defaultValue={initialData.nameEn}
            placeholder=""
          />
          <div className="h-5">
            {errors.nameEn && (
              <p className="error-message">{errors.nameEn[0]}</p>
            )}
          </div>
        </div>

        {/* Arabic Branch Name */}
        <div>
          <InputField
            type="text"
            name="nameAr"
            label={translations('branchNameAr')}
            defaultValue={initialData.nameAr}
            placeholder=""
            dir="rtl"
          />
          <div className="h-5">
            {errors.nameAr && (
              <p className="error-message">{errors.nameAr[0]}</p>
            )}
          </div>
        </div>

        <div>
          <InputField
            name="phoneNumber"
            placeholder=""
            label={translations('branchPhone')}
            defaultValue={initialData.phoneNumber}
            type="text"
          />
          <div className="h-5">
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber[0]}</p>
            )}
          </div>
        </div>

        <div>
          <InputField
            name="contactEmail"
            label={translations('branchEmail')}
            type="text"
            defaultValue={initialData.contactEmail}
            placeholder=""
          />
          <div className="h-5">
            {errors.contactEmail && (
              <p className="error-message">{errors.contactEmail[0]}</p>
            )}
          </div>
        </div>

        {/* English Address */}
        <div>
          <InputField
            placeholder=""
            type="text"
            name="addressEn"
            label={translations('branchAddressEn')}
            defaultValue={initialData.addressEn}
          />
          <div className="h-5">
            {errors.addressEn && (
              <p className="error-message">{errors.addressEn[0]}</p>
            )}
          </div>
        </div>

        {/* Arabic Address */}
        <div>
          <InputField
            placeholder=""
            type="text"
            name="addressAr"
            dir="rtl"
            label={translations('branchAddressAr')}
            defaultValue={initialData.addressAr}
          />
          <div className="h-5">
            {errors.addressAr && (
              <p className="error-message">{errors.addressAr[0]}</p>
            )}
          </div>
        </div>
        {/* website */}
        <div>
          <InputField
            placeholder=""
            name="website"
            label={translations('branchWebsite')}
            type="text"
            defaultValue={initialData.website}
          />
          <div className="h-5">
            {errors.website && (
              <p className="error-message">{errors.website[0]}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary mb-6 w-full sm:w-auto md:mb-0"
        >
          {translations('button1')}
        </button>
      </div>
    </form>
  );
}
