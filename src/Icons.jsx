const PlayIcon = (size) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.6295 6.9359L16.9323 10.9748C17.8559 11.4849 17.8559 12.7357 16.9323 13.2458L9.6295 17.2847C8.68891 17.8054 7.5 17.1704 7.5 16.1483V8.07228C7.5 7.05024 8.68891 6.4152 9.6295 6.9359Z"
      fill="white"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const PauseIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7.125V16.875"
      stroke="white"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M16.5 7.125V16.875"
      stroke="white"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
);

export { PlayIcon, PauseIcon };
