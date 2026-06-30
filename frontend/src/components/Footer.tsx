import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Youtube, Music2, Apple, Smartphone } from 'lucide-react';
import { site } from '../config/site';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand text-gray-300 mt-16">
      <div className="w-full px-8 sm:px-16 py-12">

        {/* ── Shop on the go (was MobileAppSection) ── */}
        {/* <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.07] p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-brand-accent text-xs font-bold border border-brand-accent/40 rounded-full px-3 py-1">
              ● {t('app.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">{t('app.title')}</h2>
            <p className="text-white/70 mt-3 max-w-md">{t('app.text')}</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href={site.appStoreUrl} className="flex items-center gap-3 bg-black border border-white/10 rounded-xl px-5 py-3 hover:border-white/25 transition">
              <span className="bg-white text-black rounded-lg p-1.5"><Apple size={22} /></span>
              <span>
                <span className="block text-[10px] text-white/60">DOWNLOAD ON THE</span>
                <span className="font-bold text-white">{t('app.appStore')}</span>
              </span>
            </a>
            <a href={site.playStoreUrl} className="flex items-center gap-3 bg-black border border-white/10 rounded-xl px-5 py-3 hover:border-white/25 transition">
              <span className="bg-green-500 text-black rounded-lg p-1.5"><Smartphone size={22} /></span>
              <span>
                <span className="block text-[10px] text-white/60">DOWNLOAD ON</span>
                <span className="font-bold text-white">{t('app.android')}</span>
              </span>
            </a>
          </div>
        </div> */}

        {/* ── Customer care + Follow us ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-12 pb-8 border-b border-white/10">
          <div>
            <h3 className="text-white font-bold text-lg">{t('footer.care')}</h3>
            <p className="text-sm mt-1">{t('footer.careText')}</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2 sm:text-right">{t('footer.follow')}</p>
            <div className="flex gap-4">
              <a href={site.socials.instagram} aria-label="Instagram"><Instagram size={20} /></a>
              <a href={site.socials.facebook} aria-label="Facebook"><Facebook size={20} /></a>
              <a href={site.socials.tiktok} aria-label="TikTok"><Music2 size={20} /></a>
              <a href={site.socials.youtube} aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10">
          <div>
            <h4 className="text-white font-bold mb-3">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/">{t('footer.home')}</Link></li>
              <li><Link to="/contact">{t('footer.about')}</Link></li>
              <li><Link to="/contact">{t('footer.contactUs')}</Link></li>
              <li><Link to="/how-to-buy">{t('footer.howToBuy')}</Link></li>
              <li><Link to="/how-to-buy">{t('footer.returns')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">{t('footer.shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop">{t('footer.products')}</Link></li>
              <li><Link to="/cart">{t('footer.cart')}</Link></li>
              <li><Link to="/shop">{t('footer.orders')}</Link></li>
              <li><Link to="/shop">{t('footer.wishlist')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">{t('footer.service')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact">{t('footer.support')}</Link></li>
              <li><Link to="/how-to-buy">{t('footer.returns')}</Link></li>
              <li><Link to="/contact">{t('footer.terms')}</Link></li>
              <li><Link to="/contact">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/10 text-sm flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}</p>
          <p>{site.city}</p>
        </div>
      </div>
    </footer>
  );
}