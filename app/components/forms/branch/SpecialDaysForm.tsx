'use client';

import { useState } from 'react';
import { specialClosuresSchema } from '@/validation/branch';
import { useTranslations } from 'next-intl';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname as realpath } from 'next/navigation';
import SubmitButton from '@/app/components/buttons/SubmitButton';

const BranchSpecialClosureForm = ({
  onPrevious,
  onSubmit,
  initialData,
}: any) => {
  const locale = realpath().split('/')[1];
  const t = useTranslations('Partner.specialDays');
  const [closures, setClosures] = useState([{ date: '', closeReason: '' }]);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isPending, setIsPending] = useState(false);

  const addClosure = () => {
    setClosures([...closures, { date: '', closeReason: '' }]);
  };

  const removeClosure = (index: number) => {
    setClosures(closures.filter((_, i) => i !== index));
  };

  const handleClosureChange = (
    index: number,
    field: 'date' | 'closeReason',
    value: string
  ) => {
    const updatedClosures = [...closures];
    updatedClosures[index][field] = value;
    setClosures(updatedClosures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    // Filter out empty closures before validation
    const validClosures = closures.filter(
      (closure) => closure.date || closure.closeReason
    );
    // If no valid closures, submit empty array
    if (validClosures.length === 0) {
      onSubmit({ specialClosures: [] });
      return;
    }
    // Validate closures
    const result = specialClosuresSchema.safeParse(validClosures);
    if (result.error) {
      setIsPending(false);
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      onSubmit({ specialClosures: result.data });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
        <button
          type="button"
          onClick={addClosure}
          className="inline-flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:border-solid hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          {t('button1')}
        </button>
      </div>
      <div>
        {closures.map((closure, index) => (
          <div
            key={index}
            className="relative rounded-lg px-3 py-4 transition-all duration-200"
          >
            {closures.length > 1 && (
              <button
                type="button"
                onClick={() => removeClosure(index)}
                className={`absolute ${locale === 'ar' ? 'left-4' : 'right-4'} top-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500`}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('content1')}
                </label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    defaultValue={initialData.date}
                    value={closure.date}
                    onChange={(e) =>
                      handleClosureChange(index, 'date', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div className="h-5">
                  {errors[`${index}.date`] && (
                    <p className="error-message">
                      {errors[`${index}.date`][0]}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('content2')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    defaultValue={initialData.closeReason}
                    value={closure.closeReason}
                    onChange={(e) =>
                      handleClosureChange(index, 'closeReason', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div className="h-5">
                  {errors[`${index}.closeReason`] && (
                    <p className="error-message">
                      {errors[`${index}.closeReason`][0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="h-5">
              {errors[`${index}`] && (
                <p className="error-message">{errors[`${index}`][0]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`flex justify-between space-x-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        <button
          type="button"
          onClick={onPrevious}
          className="btn-secondary w-full sm:w-auto"
        >
          {t('button2')}
        </button>
        <SubmitButton text={t('button3')} isPending={isPending} />
      </div>
    </form>
  );
};

export default BranchSpecialClosureForm;
