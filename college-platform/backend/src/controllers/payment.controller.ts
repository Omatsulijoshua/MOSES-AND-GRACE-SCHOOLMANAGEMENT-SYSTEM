import { Request, Response } from 'express';
import prisma from '../config/db';

// Admin: Get all payment categories
export const getPaymentCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.paymentCategory.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Create payment category
export const createPaymentCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, amount, paymentType, academicSession, semester, department, level, isCompulsory, dueDate, status } = req.body;
    
    const category = await prisma.paymentCategory.create({
      data: {
        title,
        description,
        amount: parseFloat(amount),
        paymentType,
        academicSession,
        semester,
        department,
        level,
        isCompulsory: isCompulsory === 'true' || isCompulsory === true,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || 'ACTIVE'
      }
    });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update payment category
export const updatePaymentCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, amount, paymentType, academicSession, semester, department, level, isCompulsory, dueDate, status } = req.body;
    const categoryId = Number(req.params.id);

    const updatedCategory = await prisma.paymentCategory.update({
      where: { id: categoryId },
      data: {
        title,
        description,
        amount: amount ? parseFloat(amount) : undefined,
        paymentType,
        academicSession,
        semester,
        department,
        level,
        isCompulsory: isCompulsory !== undefined ? (isCompulsory === 'true' || isCompulsory === true) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status
      }
    });

    res.json(updatedCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete payment category
export const deletePaymentCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);
    await prisma.paymentCategory.delete({ where: { id: categoryId } });
    res.json({ message: 'Payment category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Student: Get outstanding fees
export const getOutstandingFees = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const userId = authReq.user.id;
    const department = authReq.user.department;
    const level = authReq.user.level;

    // Find all active payment categories that apply to this student
    const categories = await prisma.paymentCategory.findMany({
      where: {
        status: 'ACTIVE',
        AND: [
          {
            OR: [
              { department: department },
              { department: 'All' },
              { department: null }
            ]
          },
          {
            OR: [
              { level: level },
              { level: 'All' },
              { level: null }
            ]
          }
        ]
      }
    });

    // Find all payment records for this student
    const payments = await prisma.studentPayment.findMany({
      where: { studentId: userId }
    });

    // Map categories to include payment status
    const outstandingFees = categories.map(category => {
      const payment = payments.find(p => p.paymentCategoryId === category.id);
      
      if (!payment) {
        return {
          ...category,
          amountPaid: 0,
          balanceRemaining: category.amount,
          paymentStatus: 'UNPAID'
        };
      }

      return {
        ...category,
        amountPaid: payment.amountPaid,
        balanceRemaining: payment.balanceRemaining,
        paymentStatus: payment.status
      };
    }).filter(fee => fee.paymentStatus !== 'PAID'); // Filter out fully paid fees

    res.json(outstandingFees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Student: Get payment history
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const userId = authReq.user.id;

    const history = await prisma.studentPayment.findMany({
      where: { studentId: userId },
      include: {
        paymentCategory: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Student: Pay fee (Mock/Simple)
export const payFee = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const userId = authReq.user.id;
    const { paymentCategoryId, amount } = req.body;

    const category = await prisma.paymentCategory.findUnique({
      where: { id: Number(paymentCategoryId) }
    });

    if (!category) {
      res.status(404).json({ message: 'Payment category not found' });
      return;
    }

    // Check if a record already exists
    const existingPayment = await prisma.studentPayment.findFirst({
      where: { studentId: userId, paymentCategoryId: category.id }
    });

    let payment;

    if (existingPayment) {
      const newAmountPaid = existingPayment.amountPaid + parseFloat(amount);
      const newBalanceRemaining = existingPayment.feeAmount - newAmountPaid;
      const status = newBalanceRemaining <= 0 ? 'PAID' : 'PARTIALLY_PAID';

      payment = await prisma.studentPayment.update({
        where: { id: existingPayment.id },
        data: {
          amountPaid: newAmountPaid,
          balanceRemaining: newBalanceRemaining,
          status,
          paidAt: new Date()
        }
      });
    } else {
      const amountPaid = parseFloat(amount);
      const balanceRemaining = category.amount - amountPaid;
      const status = balanceRemaining <= 0 ? 'PAID' : 'PARTIALLY_PAID';

      payment = await prisma.studentPayment.create({
        data: {
          studentId: userId,
          paymentCategoryId: category.id,
          feeAmount: category.amount,
          amountPaid,
          balanceRemaining,
          status,
          paidAt: new Date()
        }
      });
    }

    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
