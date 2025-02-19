'use server';
import { Prisma } from '@prisma/client';
import prisma from '@/prisma';

interface BranchResponse {
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
): Promise<BranchResponse> {
  try {
    if (formData.userId) {
    }

    return { error: { message: 'None of the condtions applied' } };
  } catch (error) {
    console.error('Appointment creation error:', error);
    return { error: { message: 'An unexpected error occurred' } };
  }
}
