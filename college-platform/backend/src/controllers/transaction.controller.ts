import { Request, Response } from 'express';
import prisma from '../config/db';
import { logAdminAction } from '../utils/logger';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: { select: { fullname: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        user: { select: { fullname: true, email: true } }
      }
    });

    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
