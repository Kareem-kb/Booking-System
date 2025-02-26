'use server';
import { bookingSchema } from '@/validation/validateBooking';
import { createAppointment } from '@/app/lib/dbAppointment';

interface AppointmentResponse {
  success?: string;
  errors?: Record<string, string[]>;
}
export async function createAppointAction(
  _prev: unknown,
  formData: FormData
): Promise<AppointmentResponse> {
  try {
    const appointmentData = Object.fromEntries(formData) as Record<
      string,
      string
    >;

    // Validate the data
    const validationResult =
      await bookingSchema.safeParseAsync(appointmentData);
    if (!validationResult.success) {
      return { errors: validationResult.error.flatten().fieldErrors };
    }

    // Combine date and time into a single DateTime value
    const date = appointmentData.date as string;
    const time = appointmentData.time as string;
    const appointmentDate = new Date(`${date}T${time}`).toISOString();
    delete appointmentData.date;
    delete appointmentData.time;

    const finalData = {
      userId: appointmentData.userId,
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
      age: Number(appointmentData.age),
      gender: appointmentData.gender,
      reason: appointmentData.reason,
      branchId: appointmentData.branchId,
      serviceId: appointmentData.serviceId,
      staffId: appointmentData.staffId,
      appointmentDate: appointmentDate,
    };
    // Add the combined DateTime to the appointment data

    // Persist finalData to the database
    await createAppointment(finalData);

    return { success: 'Appointment created successfully' };
  } catch (error) {
    console.error('Appointment creation error:', error);
    return { errors: { general: ['An unexpected error occurred'] } };
  }
}
