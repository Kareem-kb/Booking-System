import { useRouter, usePathname } from '@/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface LanguageChangerProps {
  local: string;
}

export default function LanguageChangerProps({ local }: LanguageChangerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    router.push(pathname, { locale: selectedLocale });
  };
  return (
    <select value={local} onChange={handleChange}>
      <option value="ar">Arabic</option>
      <option value="en">English</option>
    </select>
  );
  //   <Menu as="div" className="relative inline-block text-left">
  //     <div>
  //       <MenuButton value={local} onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm stroke-primary-light ring-1 ring-inset ring-primary-light hover:bg-gray-50 hover:stroke-primary">
  //         <ChevronDownIcon
  //           aria-hidden="true"
  //           className="-mx-1 mt-0.5 size-3 "
  //         />
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           strokeWidth="1.5"
  //           className="size-4 text-gray-400"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeWidth="round"
  //             d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
  //           />
  //         </svg>
  //       </MenuButton>
  //     </div>

  //     <MenuItems
  //       transition
  //       className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
  //     >
  //       <div className="py-1">
  //         <MenuItem>
  //           <a
  //             href="#"
  //             className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
  //           >
  //             Account settings
  //           </a>
  //         </MenuItem>
  //         <MenuItem>
  //           <a
  //             href="#"
  //             className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
  //           >
  //             Support
  //           </a>
  //         </MenuItem>

  //       </div>
  //     </MenuItems>
  //   </Menu>
  // );
}
