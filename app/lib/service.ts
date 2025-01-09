import prisma from '@/prisma';

interface createServiceProps {
  tilte: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  availability: boolean;
  image: string;
}

// export async function createService(formData: createServiceProps) {
//     try {
//         const service = await prisma.service.create({ formData)}
//         return service;
//     } catch (error) {
//         return
//     }
// }
