export default function HandDrawnUnderline({ children, className = '', color = 'currentColor' }) {
  return (
    <span className={`hand-drawn-underline relative inline-block ${className}`}>
      <span>{children}</span>
      <svg
        viewBox="0 0 160 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-[-2%] bottom-[-0.28em] w-[104%] h-[0.38em] pointer-events-none overflow-visible"
      >
        <path
          d="M 2 11 C 35 3, 75 14, 158 5"
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
        />
      </svg>
    </span>
  );
}
