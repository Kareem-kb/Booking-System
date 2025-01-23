import { OperatingHour } from '@/types/branch';

export function extractOperatingHours(formData: FormData): OperatingHour[] {
  const operatingHours: OperatingHour[] = [];
  let i = 0;

  while (formData.get(`operatingHours[${i}][name]`)) {
    const dayOfWeek = parseInt(
      formData.get(`operatingHours[${i}][dayOfWeek]`) as string,
      10
    );

    if (!isNaN(dayOfWeek)) {
      operatingHours.push({
        name: formData.get(`operatingHours[${i}][name]`) as string,
        dayOfWeek,
        openTime:
          (formData.get(`operatingHours[${i}][openTime]`) as string) || '09:00',
        closeTime:
          (formData.get(`operatingHours[${i}][closeTime]`) as string) ||
          '17:00',
        isClosed: formData.get(`operatingHours[${i}][isClosed]`) === 'true',
      });
    }
    i++;
  }

  return operatingHours;
}
