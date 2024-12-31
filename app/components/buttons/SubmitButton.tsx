import { Link } from '@/navigation';

interface ButtonProps {
  type: 'submit' | 'button';
  isSubmitting: 'notSubmitted' | 'pending' | 'done' | 'register';
  text1: string;
  text2: string;
  text3: string;
  linkTo: string;
  classname: string;
}

export default function SubmitButton({
  type,
  isSubmitting,
  text1,
  text2,
  text3,
  linkTo,
  classname,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${classname} flex h-10 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-1 py-2 text-sm font-medium text-white shadow-sm transition-all duration-500 ease-in`}
    >
      <span className="relative flex h-full w-full items-center justify-center transition-all duration-300 hover:scale-125">
        <span
          className={`absolute inline-block transition-all duration-500 ${
            isSubmitting === 'notSubmitted'
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
        >
          {text1}
        </span>
        <span
          className={`absolute inline-block transition-all duration-500 ${
            isSubmitting === 'pending'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="25"
            height="25"
            style={{
              shapeRendering: 'auto',
              display: 'block',
            }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path
                style={{ transform: 'scale(1)', transformOrigin: '50px 50px' }}
                strokeLinecap="round"
                d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                strokeDasharray="25.658892822265624 25.658892822265624"
                strokeWidth="10"
                stroke="#ffffff"
                fill="none"
              >
                <animate
                  values="0;256.58892822265625"
                  keyTimes="0;1"
                  dur="1.7857142857142856s"
                  repeatCount="indefinite"
                  attributeName="stroke-dashoffset"
                />
              </path>
            </g>
          </svg>
        </span>
        <span
          className={`absolute inline-block transition-all duration-500 ${
            isSubmitting === 'done'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          {text2}
        </span>
        <Link
          href={linkTo}
          className={`absolute inline-block transition-all duration-500 ${
            isSubmitting === 'register'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          {text3}
        </Link>
      </span>
    </button>
  );
}
