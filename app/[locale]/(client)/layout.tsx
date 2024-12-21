import NavBar from '@/app/components/bars/NavBar';
import Footer from '@/app/components/bars/Footer';

export default async function clintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
