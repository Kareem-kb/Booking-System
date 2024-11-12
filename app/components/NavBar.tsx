import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="row-start-3 mt-4 flex flex-wrap items-center justify-around gap-6 px-5">
      <div>
        <Link href="/">logo</Link>
      </div>
      <div className="flex space-x-5">
        <Link href="/AboutUs">About Us</Link>
        <Link href="/CakeSection">Cakes</Link>
      </div>
      <div className="flex">
        <div>
          <label htmlFor="Language">Choose a language</label>
          <select id="Language">
            <option value="Arabic">AR</option>
            <option value="English">EN</option>
          </select>
        </div>
        <Link
          href="/SignUp"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/Cart icon.svg"
            alt="Globe icon"
            width={20}
            height={20}
          />{" "}
          Sign in
        </Link>
      </div>
    </nav>
  );
}
