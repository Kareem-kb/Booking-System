import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-around gap-6  mb-5">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/Process"
      >
        Steps to order
      </Link>
      <div>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.tiktok.com/@lilycake2?_t=8qwWZMlaKvo&_r=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/Tiktok icon.svg"
            alt="Window icon"
            width={20}
            height={20}
          />
          TikTok
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.instagram.com/lilycake.2?igsh=MWRiN3J1NmZtM2Fkcg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/Instagram icon.svg"
            alt="Instagram icon"
            width={20}
            height={20}
          />
          Instagram
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.facebook.com/share/RFGnwGmUSYQokqNK/?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/Facebook icon.svg"
            alt="Globe icon"
            width={20}
            height={20}
          />
          Facebook
        </Link>
      </div>
      <div>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="home"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}
