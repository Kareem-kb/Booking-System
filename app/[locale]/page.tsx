import { useTranslations } from 'next-intl';
import ClientHome from '@/app/[locale]/(client)/page';

export default function Home() {
  const t = useTranslations('AboutUs');

  return (
    <>
      <div className="grid h-fit grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <div>
            <ClientHome />
          </div>
        </main>
      </div>
    </>
  );
}
