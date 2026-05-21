import { Request, Response } from 'express';
import prisma from '../config/db';
import { logAdminAction } from '../utils/logger';

export const getAllPayouts = async (req: Request, res: Response) => {
  try {
    const payouts = await prisma.payout.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(payouts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPayout = async (req: any, res: Response) => {
  try {
    const { recipientName, amount, bankName, accountNumber } = req.body;
    
    const payout = await prisma.payout.create({
      data: {
        recipientName,
        amount: Number(amount),
        bankName,
        accountNumber
      }
    });

    await logAdminAction(req.user.id, 'CREATE_PAYOUT', `Created payout of ${amount} to ${recipientName}`);

    res.status(201).json(payout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
