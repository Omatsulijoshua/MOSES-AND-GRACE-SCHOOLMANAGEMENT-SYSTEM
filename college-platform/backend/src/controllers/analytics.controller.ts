import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAnalyticsOverview = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
    
    const transactions = await prisma.transaction.findMany();
    
    const totalRevenue = transactions
      .filter(t => t.status === 'SUCCESS')
      .reduce((sum, t) => sum + t.amount, 0);

    const successfulTransactions = transactions.filter(t => t.status === 'SUCCESS').length;
    const failedTransactions = transactions.filter(t => t.status === 'FAILED').length;
    const pendingTransactions = transactions.filter(t => t.status === 'PENDING').length;

    res.json({
      totalUsers,
      activeUsers,
      totalRevenue,
      transactions: {
        total: transactions.length,
        successful: successfulTransactions,
        failed: failedTransactions,
        pending: pendingTransactions
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenueData = async (req: Request, res: Response) => {
  try {
    // For demo purposes, we group revenue by daily/monthly based on records.
    // A robust app might do raw SQL grouping. We will send all successful txns.
    const transactions = await prisma.transaction.findMany({
      where: { status: 'SUCCESS' },
      select: { amount: true, gatewayFee: true, netAmount: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
