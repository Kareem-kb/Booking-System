'use client';

import { useState } from 'react';
import { operatingHoursSchema } from '@/validation/branch';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const AdminTimeSettingsForm = ({ onNext, onPrevious }: any) => {
  // skipcq: JS-C1002
  const t = useTranslations('Partner.operatingHours');
  const InitialDays = [
    {
      name: t('monday'),
      dayOfWeek: 1,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('tuesday'),
      dayOfWeek: 2,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('wednesday'),
      dayOfWeek: 3,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('thursday'),
      dayOfWeek: 4,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('friday'),
      dayOfWeek: 5,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('saturday'),
      dayOfWeek: 6,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
    {
      name: t('sunday'),
      dayOfWeek: 0,
      openTime: '09:00',
      closeTime: '18:00',
      isClosed: false,
    },
  ];
  const [days, setDays] = useState(InitialDays);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleTimeChange = (
    index: number,
    field: 'openTime' | 'closeTime',
    value: string
  ) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = operatingHoursSchema.safeParse(days);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Record<string, string[]>);
    } else {
      setErrors({});
      onNext({ operatingHours: result.data });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-6">
      <h1 className="h1">{t('title')}</h1>
      <div>
        {days.map((day, index) => (
          <div key={day.dayOfWeek} className="p-2 transition-all duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {day.name}
              </h3>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  name="isClosed"
                  type="checkbox"
                  checked={day.isClosed}
                  onChange={(e) =>
                    setDays((prev) =>
                      prev.map((d, i) =>
                        i === index ? { ...d, isClosed: e.target.checked } : d
                      )
                    )
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                <span className="mx-2 text-sm font-medium text-gray-700">
                  {t('content1')}
                </span>
              </label>
            </div>

            {!day.isClosed && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('content2')}
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={day.openTime}
                      onChange={(e) =>
                        handleTimeChange(index, 'openTime', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>{' '}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('content3')}
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={day.closeTime}
                      onChange={(e) =>
                        handleTimeChange(index, 'closeTime', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 h-5">
              {errors[`${index}`] && (
                <p className="error-message">{errors[`${index}`][0]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={onPrevious}
          className="btn-secondary w-full sm:w-auto"
        >
          {t('button2')}
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          {t('button1')}
        </button>
      </div>
    </form>
  );
};

export default AdminTimeSettingsForm;
