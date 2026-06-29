import { ReactNode } from 'react';

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <img src="/logo.png" alt="Classy Kitchen Utensils" className="h-12 w-12 rounded-full mx-auto mb-6" />
          {children}
        </div>
      </div>
      {/* brand side */}
      <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-brand-accent to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white 2px, transparent 2px)', backgroundSize: '28px 28px' }} />
        <div className="relative text-center px-10">
          <h2 className="text-5xl font-extrabold tracking-tight">Classy Kitchen</h2>
          <p className="mt-4 text-white/85 max-w-sm mx-auto">Manage your products, prices and photos — all in one place.</p>
        </div>
      </div>
    </div>
  );
}
