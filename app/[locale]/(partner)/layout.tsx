// app/[locale]/admin/layout.tsx
import SideBar from '@/app/components/bars/SideBar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col justify-center md:flex-row">
      <div className="md:sticky md:top-0 md:h-screen md:w-1/4">
        <SideBar />
      </div>
      <div className="mt-8 flex-grow rounded-md bg-white px-5 pt-10 md:mx-4 md:ml-4 md:mt-20 md:w-3/4 md:pt-0">
        {children}
      </div>
    </div>
  );
}
