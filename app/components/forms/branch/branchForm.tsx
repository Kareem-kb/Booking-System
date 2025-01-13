'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { createBranchAction } from '@/app/actions/branchActions';
import BasicInfoForm from './BasicInfoForm';
import AdminTimeSettingsForm from './AdminTimeSettingsForm';
import SpecialDaysForm from './SpecialDaysForm';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    operatingHours: {},
    specialClosures: [],
  });

  const [state, formAction, isPending] = useActionState(
    createBranchAction,
    null
  );

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };
  useEffect(() => {
    console.log('Form Data basicInfo:', formData.basicInfo);
    console.log('Form Data operationHours:', formData.operatingHours);
    console.log('Form Data specialClosures:', formData.specialClosures);
  }, [formData]);

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (finalData: any) => {
    const allData = { ...formData, ...finalData };
    console.log('All Data:', allData);
  };

  return (
    <div className="mx-auto p-5">
      {step === 1 && (
        <BasicInfoForm onNext={handleNext} initialData={formData.basicInfo} />
      )}

      {step === 2 && (
        <AdminTimeSettingsForm
          onNext={handleNext}
          onPrevious={handlePrevious}
          initialData={formData.operatingHours}
        />
      )}
      {step === 3 && (
        <SpecialDaysForm
          onSubmit={handleSubmit}
          onPrevious={handlePrevious}
          initialData={formData.specialClosures}
        />
      )}

      {state?.success && (
        <div className="mt-4 rounded-md bg-green-100 p-4 text-green-800">
          <h2 className="font-bold">Server Response</h2>
          <pre className="mt-2 whitespace-pre-wrap text-sm">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
