'use server';
import prisma from '@/prisma';
import { branchSchema } from '@/app/validation/branch';

interface CreateBranchForm {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  website: string;
}

export async function createBranch(formData: CreateBranchForm) {
  try {
  
    console.log('Creating business with data:', formData);

    // Create business

    return { success: 'Branch created successfully' };
  } catch (error) {
    console.error('Failed to create business:', error);
    throw new Error('Failed to create business.');
  }
}
