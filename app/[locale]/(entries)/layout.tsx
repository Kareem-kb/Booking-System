// app/layout.tsx
export default function EntriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-400 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] sm:block"
      >
        <defs>
          <pattern
            x="0"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" stroke="gray" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full max-w-[480px] p-6">
          <div className="relative bg-black/5 px-6 py-12 backdrop-blur-lg sm:rounded-lg sm:px-12">
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
