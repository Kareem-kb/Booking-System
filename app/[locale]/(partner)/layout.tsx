// app/[locale]/admin/layout.tsx
import SideBar from '@/app/components/bars/SideBar';

import { BellIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-1/4 shrink-0 lg:block">
          <SideBar />
        </aside>
        <main className="flex-1 lg:w-3/4">{children}</main>
      </div>
    </div>
  );
}


// const navigation = [
//   { name: 'Dashboard', href: 'dashbord', icon: HomeIcon, current: true },
//   { name: 'Products', href: 'products', icon: FolderIcon, current: false },
//   {
//     name: 'Business ',
//     href: 'businesssettings',
//     icon: CalendarIcon,
//     current: false,
//   },
//   {
//     name: 'Account ',
//     href: 'accountsettings',
//     icon: UserIcon,
//     current: false,
//   },
//   {
//     name: 'Sales',
//     href: 'sales',
//     icon: DocumentDuplicateIcon,
//     current: false,
//   },
//   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
// ];
