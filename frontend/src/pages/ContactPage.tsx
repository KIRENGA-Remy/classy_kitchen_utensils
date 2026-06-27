import { useTranslation } from 'react-i18next';
import { MapPin, Phone, CreditCard } from 'lucide-react';
import { site } from '../config/site';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-brand mb-6">{t('contact.title')}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex gap-3"><MapPin className="text-brand-accent shrink-0" /><p>{t('contact.location')}</p></div>
          <div className="flex gap-3"><Phone className="text-brand-accent shrink-0" /><p>{site.helpline}</p></div>
          <div className="flex gap-3"><CreditCard className="text-brand-accent shrink-0" /><p>{t('contact.payments')}</p></div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-100 aspect-video">
          <iframe title="map" src={site.mapEmbedUrl} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  );
}
