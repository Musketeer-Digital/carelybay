export const MarkerIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={"none"}
    >
      <g clipPath="url(#clip0_1148_9596)">
        <path
          d="M18.5 10.2C18.5 12.77 16.4 15.99 12.34 19.71L12 20.01L11.66 19.7C7.6 15.99 5.5 12.77 5.5 10.2C5.5 6.36 8.32 3.5 12 3.5C15.68 3.5 18.5 6.35 18.5 10.2Z"
          fill={color ? color : "#5F6368"}
          fillOpacity="0.3"
        />
        <path
          d="M12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
          fill={color ? color : "black"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1148_9596">
          <rect width="24" height="24" fill={"white"} />
        </clipPath>
      </defs>
    </svg>
  );
};
