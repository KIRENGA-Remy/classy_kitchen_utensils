import { Request, Response, NextFunction } from 'express';
import { createOrder } from './order.service';

export async function postOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await createOrder(req.body);
    // The payment step (MoMo/Airtel) is triggered next — see modules/payments.
    res.status(201).json({
      reference: order.reference,
      totalRwf: order.totalRwf,
      paymentMethod: order.paymentMethod,
      status: order.status,
    });
  } catch (err) {
    next(err);
  }
}
