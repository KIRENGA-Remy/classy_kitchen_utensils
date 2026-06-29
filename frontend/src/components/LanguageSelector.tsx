import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'rw', label: 'Ikinyarwanda', short: 'RW' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => i18n.language?.startsWith(l.code)) ?? LANGS[0];

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const choose = (code: string) => { i18n.changeLanguage(code); setOpen(false); };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-brand-accent px-2 py-1.5 rounded-lg">
        <Globe size={18} />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.short}</span>
        <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => choose(l.code)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 w-5">{l.short}</span> {l.label}
              </span>
              {current.code === l.code && <Check size={15} className="text-brand-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
