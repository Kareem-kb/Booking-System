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
  const t = useTranslations('Partner.branchInfo');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
    <form onSubmit={handleSubmit} className="space-y-9">
      <h1 className="h1">{t('title')}</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* English Branch Name */}
        <div>
          <InputField
            type="text"
            name="nameEn"
            label={t('branchNameEn')}
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
            label={t('branchNameAr')}
            defaultValue={initialData.nameAr}
            placeholder=""
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
            label={t('branchPhone')}
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
            label={t('branchEmail')}
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
            label={t('branchAddressEn')}
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
            label={t('branchAddressAr')}
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
            label={t('branchWebsite')}
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
        <button type="submit" className="btn-primary w-full sm:w-auto">
          {t('button1')}
        </button>
      </div>
    </form>
  );
}
