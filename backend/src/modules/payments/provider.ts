// One interface for every mobile-money provider. The order flow depends on
// THIS, not on MoMo or Airtel directly, so adding a provider is easy.
export interface PaymentRequest {
  reference: string;     // our order reference
  amountRwf: number;
  phone: string;         // payer phone (e.g. 2507XXXXXXXX)
}

export interface PaymentResult {
  provider: 'MTN_MOMO' | 'AIRTEL_MONEY';
  status: 'PENDING' | 'PAID' | 'FAILED';
  providerRef?: string;
  message?: string;
}

export interface PaymentProvider {
  initiate(req: PaymentRequest): Promise<PaymentResult>;
}
