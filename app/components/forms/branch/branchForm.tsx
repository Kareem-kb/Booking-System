'use client';

import { useState, useEffect } from 'react';
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

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };
  useEffect(() => {
    // console.log('Form Data basicInfo:', formData.basicInfo);
    // console.log('Form Data operationHours:', formData.operatingHours);
    // console.log('Form Data specialClosures:', formData.specialClosures);
  }, [formData]);

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (finalData: any) => {
    const allData = { ...formData, ...finalData };

    // Convert allData to FormData
    const formDataObj = new FormData();
    for (const key in allData) {
      if (Array.isArray(allData[key])) {
        // Handle arrays (e.g., operatingHours, specialClosures)
        allData[key].forEach((item, index) => {
          for (const subKey in item) {
            formDataObj.append(`${key}[${index}][${subKey}]`, item[subKey]);
          }
        });
      } else if (typeof allData[key] === 'object') {
        // Handle nested objects (e.g., basicInfo)
        for (const subKey in allData[key]) {
          formDataObj.append(`${key}[${subKey}]`, allData[key][subKey]);
        }
      } else {
        // Handle primitive values
        formDataObj.append(key, allData[key]);
      }
    }

    // Pass FormData to createBranchAction
    createBranchAction(formDataObj);
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
    </div>
  );
}
