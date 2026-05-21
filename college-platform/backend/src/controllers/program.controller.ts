import { Request, Response } from 'express';
import prisma from '../config/db';

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany();
    res.json(programs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgramById = async (req: Request, res: Response) => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: Number(req.params.id) }
    });
    
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
