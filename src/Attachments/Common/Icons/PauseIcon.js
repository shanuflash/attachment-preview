const PauseIcon = ({ size = 24, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7.125V16.875"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M16.5 7.125V16.875"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default PauseIcon;
