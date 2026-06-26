import { PaymentProvider, PaymentRequest, PaymentResult } from './provider';

// Airtel Money Collections. Docs: https://developers.airtel.africa
// TODO (Phase 5): OAuth token -> POST /merchant/v1/payments/ -> webhook callback.
export const airtelProvider: PaymentProvider = {
  async initiate(req: PaymentRequest): Promise<PaymentResult> {
    return {
      provider: 'AIRTEL_MONEY',
      status: 'PENDING',
      message: `Airtel collection for ${req.amountRwf} RWF to ${req.phone} (stub)`,
    };
  },
};
