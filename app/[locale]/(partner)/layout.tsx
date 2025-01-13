// app/[locale]/admin/layout.tsx
import SideBar from '@/app/components/bars/SideBar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="justify-item mx-auto grid max-w-5xl md:grid-cols-11">
      <div className="min-w-fit md:sticky md:top-0 md:col-span-2 md:h-screen">
        <SideBar />
      </div>
      <div className="m-12 rounded-md bg-white px-5 md:col-span-7 md:mx-14 md:mt-20 lg:mx-10">
        {children}
      </div>
    </div>
  );
}
