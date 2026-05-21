import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        matricNo: true,
        department: true,
        level: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserAdmin = async (req: Request, res: Response) => {
  try {
    const { matricNo, department, level, role, status } = req.body;
    const userId = Number(req.params.id);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { matricNo, department, level, role, status },
      select: { id: true, fullname: true, matricNo: true, department: true, level: true, role: true, status: true }
    });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserAdmin = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    await prisma.announcement.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
