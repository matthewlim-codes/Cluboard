import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-white">
      <main className={hideNav ? '' : 'pb-20'}>{children}</main>
    </div>
  );
}

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  branding?: boolean;
}

export function PageHeader({ title, subtitle, action, branding }: PageHeaderProps) {
  if (branding) {
    return (
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                Cluboard
              </span>
            </h1>
            <p className="text-xs text-neutral-500">What&apos;s in the Cluboard?</p>
          </div>
          {action}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {title && (
            <h1 className="truncate text-lg font-semibold text-neutral-900">{title}</h1>
          )}
          {subtitle && (
            <p className="truncate text-xs text-neutral-500">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
