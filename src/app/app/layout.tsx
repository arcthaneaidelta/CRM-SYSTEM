'use client';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const titles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/crm': 'CRM Pipeline',
  '/app/leads': 'Lead Generation',
  '/app/outreach': 'Outreach Automation',
  '/app/scheduling': 'Scheduling',
  '/app/billing': 'Billing & Subscriptions',
  '/app/clients': 'Client Management',
  '/app/workflows': 'Workflow Automation',
  '/app/team': 'Team Management',
  '/app/reports': 'Reports & Analytics',
  '/app/settings': 'Settings',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? 'AccountOS';

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#0a0a0f' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
          className="flex-1 overflow-y-auto p-6"
          style={{ background: '#0a0a0f' }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
