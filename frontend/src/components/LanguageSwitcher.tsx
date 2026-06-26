import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('rw') ? 'rw' : 'en';
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={lang === 'en' ? 'text-brand-accent' : 'text-gray-500 hover:text-gray-900'}
      >
        EN
      </button>
      <span className="text-gray-300">/</span>
      <button
        onClick={() => i18n.changeLanguage('rw')}
        className={lang === 'rw' ? 'text-brand-accent' : 'text-gray-500 hover:text-gray-900'}
      >
        RW
      </button>
    </div>
  );
}
