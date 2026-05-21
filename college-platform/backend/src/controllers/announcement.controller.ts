import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(announcements);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const announcement = await prisma.announcement.create({
      data: { title, content }
    });
    res.status(201).json(announcement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
