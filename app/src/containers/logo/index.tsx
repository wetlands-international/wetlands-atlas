export const LogoText = () => (
  <div className={"ps-4"}>
    <h3 className={"font-black"}>
      Wetland <span className={"font-normal"}>Atlas</span>
    </h3>
  </div>
);

export const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="homeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
        <rect width="48" height="48" fill="white" />
        <g transform="translate(24,24) scale(0.7) translate(-24,-24)">
          <path
            d="
              M24 6
              C19 8, 8 16, 9 22
              L13 22
              L13 42
              L19 42
              L19 31 Q19 27, 24 27 Q29 27, 29 31
              L29 42
              L35 42
              L35 22
              L39 22
              C37 14, 29 7, 24 6Z
            "
            fill="black"
          />
        </g>
      </mask>

      <circle cx="24" cy="24" r="24" fill="white" mask="url(#homeMask)" />
    </svg>
  );
};
