import { PaymentProvider, PaymentRequest, PaymentResult } from './provider';

// MTN MoMo Collections (request-to-pay). Sandbox docs: https://momodeveloper.mtn.com
// TODO (Phase 5): real flow is
//   1. POST /collection/token/      -> access token
//   2. POST /collection/v1_0/requesttopay (X-Reference-Id, callback URL)
//   3. provider calls our webhook OR we poll .../requesttopay/{id}
export const momoProvider: PaymentProvider = {
  async initiate(req: PaymentRequest): Promise<PaymentResult> {
    // Stub for now — wire real API keys from env in Phase 5.
    return {
      provider: 'MTN_MOMO',
      status: 'PENDING',
      message: `MoMo request-to-pay for ${req.amountRwf} RWF to ${req.phone} (stub)`,
    };
  },
};
