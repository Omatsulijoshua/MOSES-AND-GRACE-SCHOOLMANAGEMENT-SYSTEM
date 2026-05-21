import { Request, Response } from 'express';
import prisma from '../config/db';
import { logAdminAction } from '../utils/logger';

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await prisma.wallet.findMany({
      include: {
        user: { select: { fullname: true, email: true } }
      },
      orderBy: { balance: 'desc' }
    });
    res.json(wallets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const creditWallet = async (req: any, res: Response) => {
  try {
    const { userId, amount, description } = req.body;
    
    // Find or create wallet
    let wallet = await prisma.wallet.findUnique({ where: { userId: Number(userId) } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { userId: Number(userId), balance: 0 } });
    }

    // Transaction
    const result = await prisma.$transaction([
      prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: Number(amount) } }
      }),
      prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'CREDIT',
          amount: Number(amount),
          description: description || 'Admin Credit'
        }
      })
    ]);

    await logAdminAction(req.user.id, 'CREDIT_WALLET', `Credited ${amount} to user ${userId}`);

    res.json(result[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const debitWallet = async (req: any, res: Response) => {
  try {
    const { userId, amount, description } = req.body;
    
    const wallet = await prisma.wallet.findUnique({ where: { userId: Number(userId) } });
    if (!wallet || wallet.balance < Number(amount)) {
      res.status(400).json({ message: 'Insufficient balance or wallet not found' });
      return;
    }

    const result = await prisma.$transaction([
      prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: Number(amount) } }
      }),
      prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'DEBIT',
          amount: Number(amount),
          description: description || 'Admin Debit'
        }
      })
    ]);

    await logAdminAction(req.user.id, 'DEBIT_WALLET', `Debited ${amount} from user ${userId}`);

    res.json(result[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
