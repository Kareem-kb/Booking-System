export default function NotFound() {
  return (
    <>
      <div className="relative isolate min-h-full">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] "
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
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base/8 font-semibold text-gray-400">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-black sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-400/70 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#" className="text-sm/7 font-semibold text-black">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
