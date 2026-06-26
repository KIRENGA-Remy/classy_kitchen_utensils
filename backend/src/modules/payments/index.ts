import { PaymentProvider } from './provider';
import { momoProvider } from './momo';
import { airtelProvider } from './airtel';

export function getProvider(method: 'MTN_MOMO' | 'AIRTEL_MONEY'): PaymentProvider {
  return method === 'MTN_MOMO' ? momoProvider : airtelProvider;
}
