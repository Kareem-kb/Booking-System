'use server';

import { daysOfWeek } from '../lib/lists';
import { branchSchema } from '../validation/branch';

export async function createBranchAction(prevState: any, formData: FormData) {
  const fields = ['name', 'contactEmail', 'phoneNumber', 'address', 'website'];
  const branchData = Object.fromEntries(
    fields.map((field) => [field, formData.get(field)])
  );

  const operatingHours = daysOfWeek.map((day) => ({
    dayOfWeek: day,
    opensAt: formData.get(`operatingHours.${day.day.toLowerCase()}.opensAt`),
    closesAt: formData.get(`operatingHours.${day.day.toLowerCase()}.closesAt`),
    isClosed:
      formData.get(`operatingHours.${day.day.toLowerCase()}.isClosed`) === 'on',
  }));

  const closuresArray = [];
  for (let i = 0; i < 100; i++) {
    // Assuming a maximum of 100 possible closures
    const date = formData.get(`specialClosures[${i}].date`);
    const reason = formData.get(`specialClosures[${i}].reason`);

    if (date && reason) {
      closuresArray.push({ date, reason });
    } else if (date || reason) {
      console.warn(`Incomplete closure data at index ${i}`);
    } else {
      break; // Stop if we find no more closure data
    }
  }
  // first posting the branchData object from the form to the database




  // Second posting the operatingHours object from the form to the database
  
  


  //  Third posting the closuresArray object from the form to the database
  console.log('Server-side form data:', {
    ...branchData,
    operatingHours,
    closuresArray,
  });

  return {
    success: true,
    branchData: { ...branchData, operatingHours, closuresArray },
  };
}
