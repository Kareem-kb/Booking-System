// app/[locale]/admin/layout.tsx
import SideBar from '@/app/components/bars/SideBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
