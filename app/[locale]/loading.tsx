import Image from 'next/image';
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
      <Image
        src="/splash-logo.svg"
        alt="Loading"
        className="h-24 w-24 animate-pulse"
        width={96}
        height={96}
      />
    </div>
  );
}
