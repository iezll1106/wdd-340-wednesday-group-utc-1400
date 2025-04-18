import SideNav from '../ui/dashboard/sidenav'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | HCH Dashboard',
    default: 'HCH Dashboard',
  },
  description: 'WDD 340 Group 1 Project',
  metadataBase: new URL('https://wdd-340-wednesday-group-utc-1400.vercel.app/'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    )
}