import prisma from '../config/db';

export const logAdminAction = async (adminId: number, action: string, description?: string) => {
  try {
    await prisma.adminLog.create({
      data: {
        adminId,
        action,
        description
      }
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
};
