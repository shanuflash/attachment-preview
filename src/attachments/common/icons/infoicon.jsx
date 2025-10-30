const InfoIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill="black"
      fillOpacity="0.08"
    />
    <path
      d="M10.5 16.25H13.5M12.159 16.125V11.25H10.875"
      stroke="#6A6A6A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="11.8125"
      cy="8.4375"
      r="0.75"
      fill="#6A6A6A"
      stroke="#6A6A6A"
      strokeWidth="0.375"
    />
  </svg>
);

export default InfoIcon;
