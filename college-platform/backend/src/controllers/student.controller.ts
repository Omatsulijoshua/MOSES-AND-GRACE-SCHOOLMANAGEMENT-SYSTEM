import { Request, Response } from 'express';
import prisma from '../config/db';

export const getProfile = async (req: any, res: Response) => {
  try {
    const student = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, fullname: true, email: true, matricNo: true, department: true, level: true }
    });
    
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { fullname, email, matricNo, department, level } = req.body;
    const updatedStudent = await prisma.user.update({
      where: { id: req.user.id },
      data: { fullname, email, matricNo, department, level },
      select: { id: true, fullname: true, email: true, matricNo: true, department: true, level: true }
    });
    
    res.json(updatedStudent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
