import { useTranslation } from 'react-i18next';
import { MapPin, Phone, CreditCard, MessageCircle, Truck, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import { site } from '../config/site';

export default function ContactPage() {
  const { t } = useTranslation();

  // build the WhatsApp link from the existing helpline number
  const phoneDigits = site.helpline?.replace(/[^0-9]/g, '') || '';

  const cards = [
    {
      icon: MapPin,
      label: t('contact.visitLabel', 'Visit us'),
      value: t('contact.location', 'Kigali, Rwanda'),
    },
    {
      icon: Phone,
      label: t('contact.callLabel', 'Call us'),
      value: site.helpline || '+250 788 123 456',
    },
    {
      icon: CreditCard,
      label: t('contact.payLabel', 'Payments'),
      value: t('contact.payments', 'MTN MoMo, Airtel Money, Card'),
    },
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram', href: site.socials?.instagram || '#' },
    { icon: Facebook, label: 'Facebook', href: site.socials?.facebook || '#' },
    { icon: Music2, label: 'TikTok', href: site.socials?.tiktok || '#' },
    { icon: Youtube, label: 'YouTube', href: site.socials?.youtube || '#' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand">{t('contact.title', 'Contact Us')}</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          {t('contact.subtitle', "We're here to help. Reach us, find us on the map, or order on WhatsApp.")}
        </p>
      </div>

      {/* Two columns: left info, right map */}
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* LEFT: illustration + info + actions */}
        <div className="flex flex-col gap-6">
          {/* Illustration panel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-100 p-6 flex items-center gap-5">
            <img
              src="/delivery_hand.png"
              alt={t('contact.deliveryAlt', 'Order tracking on a phone')}
              className="w-32 sm:w-40 shrink-0 drop-shadow-xl"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 text-brand-accent text-xs font-bold border border-brand-accent/40 rounded-full px-3 py-1">
                <Truck size={14} /> {t('contact.deliverBadge', 'Nationwide delivery')}
              </span>
              <h2 className="text-xl font-extrabold text-brand mt-3">
                {t('contact.deliverTitle', 'We bring it to you')}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {t('contact.deliverText', 'Order from anywhere in Rwanda and track it to your door.')}
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-3">
            {cards.map((c, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-3">
                  <c.icon size={18} />
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{c.label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Action row: WhatsApp (2/3) + Social (1/3) - UPDATED */}
          <div className="grid grid-cols-3 gap-3">
            {/* WhatsApp - takes 2/3 */}
            <a
              href={`https://wa.me/${phoneDigits}`}
              target="_blank"
              rel="noreferrer"
              className="col-span-2 flex items-center justify-center gap-2 bg-brand-accent text-white font-bold px-6 py-3 rounded-full hover:bg-amber-600 transition"
            >
              <MessageCircle size={18} /> {t('contact.whatsapp', 'Chat on WhatsApp')}
            </a>

            {/* Social platforms - takes 1/3 */}
            <div className="col-span-1 bg-white border border-gray-100 rounded-full px-3 py-1 flex items-center justify-around">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center hover:bg-brand-accent hover:text-white transition"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: map (fills column height) */}
        <div className="rounded-3xl overflow-hidden border border-gray-100 min-h-[420px] lg:min-h-full">
          <iframe
            title="map"
            src={site.mapEmbedUrl || 'https://www.openstreetmap.org/export/embed.html?bbox=30.0%2C-2.0%2C31.0%2C-1.0&layer=mapnik'}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}


