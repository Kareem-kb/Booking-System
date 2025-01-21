interface ButtonProps {
  text: string;
  classname?: string;
  isPending: boolean;
}

export default function SubmitButton({
  text,
  classname,
  isPending,
}: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`btn-primary w-full ${classname}`}
      aria-label={isPending ? 'Registring' : text}
    >
      <div className="relative h-6 w-full">
        <span
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
            isPending ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {text}
        </span>
        <span
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
            isPending ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="25"
            height="25"
            style={{
              shapeRendering: 'auto',
              display: 'block',
            }}
          >
            <g>
              <path
                style={{
                  transform: 'scale(1)',
                  transformOrigin: '50px 50px',
                }}
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
      </div>
    </button>
  );
}
