'use client';

import { useState } from 'react';
import { createBranchAction } from '@/app/actions/branchActions';
import BasicInfoForm from './BasicInfoForm';
import AdminTimeSettingsForm from './AdminTimeSettingsForm';
import SpecialDaysForm from './SpecialDaysForm';
import { toast } from 'sonner';
import { useRouter } from '@/navigation';
import { usePathname as realpath } from 'next/navigation';

interface CreateBranchForm {
  name: string;
  contactEmail?: string;
  phoneNumber?: string;
  address: string;
  website?: string;
}

interface OperatingHour {
  name: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface SpecialClosure {
  date: Date;
  closeReason?: string | null;
}

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    basicInfo: Partial<CreateBranchForm>;
    operatingHours: OperatingHour[];
    specialClosures: SpecialClosure[];
  }>({
    basicInfo: {},
    operatingHours: [],
    specialClosures: [],
  });

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (finalData: any) => {
    const allData = { ...formData, ...finalData };
    // Pass FormData to createBranchAction
    const result = await createBranchAction(allData);
    if (result.success) {
      toast.success(result.success);
      router.push('/dashboard');
    } else if (result.error) {
      toast.error(result.error.message);
    }
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
