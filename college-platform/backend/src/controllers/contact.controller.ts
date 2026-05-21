import { Request, Response } from 'express';
import prisma from '../config/db';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { fullname, email, message } = req.body;
    const contactMessage = await prisma.contactMessage.create({
      data: { fullname, email, message }
    });
    res.status(201).json({ message: 'Message submitted successfully', data: contactMessage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
