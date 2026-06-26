import { useTranslation } from 'react-i18next';
import { site } from '../config/site';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">{t('contact.title')}</h1>
      <p className="text-gray-600">{t('contact.location')}</p>
      <p className="text-gray-600 mb-6">{t('contact.payments')}</p>

      {site.mapEmbedUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-100 aspect-video">
          <iframe
            title="map"
            src={site.mapEmbedUrl}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
