import { Link } from 'react-router-dom';

export default function SectionHeader({ title, to, more }: { title: string; to?: string; more?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <h2 className="text-xl sm:text-2xl font-extrabold text-brand">{title}</h2>
      {to && <Link to={to} className="text-sm font-semibold text-brand-accent hover:underline">{more}</Link>}
    </div>
  );
}
