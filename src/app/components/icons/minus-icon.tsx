export const MinusIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill={color ? color : "none"}
    >
      <path
        d="M0.5 1.75V0.25H13.5V1.75H0.5Z"
        fill={color ? color : "#414141"}
      />
    </svg>
  );
};
