'use server';
import { addMinutes } from 'date-fns';
import { Gender, Role } from '@prisma/client';
import prisma from '@/prisma';

interface AppointmentResponse {
  success?: string;
  error?: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}

interface CreateAppointment {
  email: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
  reason?: string;
  branchId: string;
  serviceId: string;
  staffId: string;
  userId?: string;
  appointmentDate: string;
}

export async function createAppointment(
  formData: CreateAppointment
): Promise<AppointmentResponse> {
  try {
    // Main condition for registered users
    if (formData.userId) {
      const result = await prisma.$transaction(async (tx) => {
        // Create appointment with user relationship
        await tx.appointment.create({
          data: {
            userId: formData.userId!,
            staffId: formData.staffId,
            serviceId: formData.serviceId,
            branchId: formData.branchId,
            appointmentDate: new Date(formData.appointmentDate),
            reason: formData.reason,
            gender: formData.gender as Gender,
            phone: formData.phone,
            age: formData.age,
            status: 'BOOKED',
            calendarEvent: {
              create: {
                startDate: new Date(formData.appointmentDate),
                endDate: addMinutes(new Date(formData.appointmentDate), 45),
                eventType: 'APPOINTMENT',
                branchId: formData.branchId,
                staffId: formData.staffId,
              },
            },
          },
        });

        return { success: 'Appointment created successfully' };
      });

      return result;
    }

    // Handle if session user is not available
    if (formData.email) {
      const userExists = await prisma.user.findUnique({
        where: { email: formData.email },
      });

      if (userExists) {
        const result = await prisma.$transaction(async (tx) => {
          // Create appointment with user relationship
          await tx.appointment.create({
            data: {
              userId: userExists.id,
              staffId: formData.staffId,
              serviceId: formData.serviceId,
              branchId: formData.branchId,
              appointmentDate: new Date(formData.appointmentDate),
              reason: formData.reason,
              gender: formData.gender as Gender,
              phone: formData.phone,
              age: formData.age,
              status: 'BOOKED',
              calendarEvent: {
                create: {
                  startDate: new Date(formData.appointmentDate),
                  endDate: addMinutes(new Date(formData.appointmentDate), 45),
                  eventType: 'APPOINTMENT',
                  branchId: formData.branchId,
                  staffId: formData.staffId,
                },
              },
            },
          });

          return { success: 'Appointment created successfully' };
        });

        return result;
      }

      // Handle if user does not exist
      if (!userExists) {
        const result = await prisma.$transaction(async (tx) => {
          await tx.user.create({
            data: {
              email: formData.email,
              name: formData.name,
              role: 'CLIENT' as Role,
              appointments: {
                create: {
                  staffId: formData.staffId,
                  serviceId: formData.serviceId,
                  branchId: formData.branchId,
                  appointmentDate: new Date(formData.appointmentDate),
                  reason: formData.reason,
                  gender: formData.gender as Gender,
                  phone: formData.phone,
                  age: formData.age,
                  status: 'BOOKED',
                  calendarEvent: {
                    create: {
                      startDate: new Date(formData.appointmentDate),
                      endDate: addMinutes(
                        new Date(formData.appointmentDate),
                        45
                      ),
                      eventType: 'APPOINTMENT',
                      branchId: formData.branchId,
                      staffId: formData.staffId,
                    },
                  },
                },
              },
            },
          });

          return { success: 'Appointment created successfully' };
        });

        return result;
      }
    }

    // Handle other conditions here later
    return { error: { message: 'User registration required for booking' } };
  } catch (error: any) {
    console.error('Appointment creation error:', error);

    // Handle Prisma errors
    if (error.code === 'P2002') {
      return {
        error: { message: 'Timeslot already booked', code: 'CONFLICT' },
      };
    }

    return {
      error: {
        message: error.message || 'Failed to create appointment',
        code: error.code,
      },
    };
  }
}
