const PlayIcon = ({ size = 24, color = 'white' }) => (
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
      fill={color}
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M16.5 7.125V16.875"
      stroke={color}
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
);

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
      fill-opacity="0.08"
    />
    <path
      d="M10.5 16.25H13.5M12.159 16.125V11.25H10.875"
      stroke="#6A6A6A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="11.8125"
      cy="8.4375"
      r="0.75"
      fill="#6A6A6A"
      stroke="#6A6A6A"
      stroke-width="0.375"
    />
  </svg>
);

const DownFilledArrowIcon = ({ size = 14 }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.81426 9.874C6.91699 9.97779 7.08467 9.97779 7.1874 9.874L11.1049 5.91591C11.2689 5.75015 11.1515 5.46875 10.9183 5.46875L3.08334 5.46875C2.85013 5.46875 2.73272 5.75016 2.89677 5.91591L6.81426 9.874Z"
      fill="#848484"
    />
  </svg>
);

const CSVIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#F39C12" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4837 13.483L24.1843 10.1837C23.7468 9.74617 23.153 9.5 22.5347 9.5H14.1673C12.8782 9.5 11.834 10.5442 11.834 11.8333V28.1667C11.834 29.4558 12.8782 30.5 14.1673 30.5H25.834C27.1232 30.5 28.1673 29.4558 28.1673 28.1667V15.1327C28.1673 14.5143 27.9212 13.9205 27.4837 13.483V13.483Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.1673 15.3333H23.5007C22.8567 15.3333 22.334 14.8107 22.334 14.1667V9.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9993 18.833V26.9997"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.334 22.9163H24.6673"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.5007 26.9997H16.5007C15.8567 26.9997 15.334 26.477 15.334 25.833V19.9997C15.334 19.3557 15.8567 18.833 16.5007 18.833H23.5007C24.1447 18.833 24.6673 19.3557 24.6673 19.9997V25.833C24.6673 26.477 24.1447 26.9997 23.5007 26.9997Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const XLSIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#27AE60" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4837 13.483L24.1843 10.1837C23.7468 9.74617 23.153 9.5 22.5347 9.5H14.1673C12.8782 9.5 11.834 10.5442 11.834 11.8333V28.1667C11.834 29.4558 12.8782 30.5 14.1673 30.5H25.834C27.1232 30.5 28.1673 29.4558 28.1673 28.1667V15.1327C28.1673 14.5143 27.9212 13.9205 27.4837 13.483V13.483Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.5007 20H23.5007C24.1447 20 24.6673 20.5227 24.6673 21.1667V25.8333C24.6673 26.4773 24.1447 27 23.5007 27H16.5007C15.8567 27 15.334 26.4773 15.334 25.8333V21.1667C15.334 20.5227 15.8567 20 16.5007 20Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24.6673 23.5003H15.334"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.1673 20V27"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.1673 15.3333H23.5007C22.8567 15.3333 22.334 14.8107 22.334 14.1667V9.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DOCIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#2980B9" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4837 13.483L24.1843 10.1837C23.7468 9.74617 23.153 9.5 22.5347 9.5H14.1673C12.8782 9.5 11.834 10.5442 11.834 11.8333V28.1667C11.834 29.4558 12.8782 30.5 14.1673 30.5H25.834C27.1232 30.5 28.1673 29.4558 28.1673 28.1667V15.1327C28.1673 14.5143 27.9212 13.9205 27.4837 13.483V13.483Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.1673 15.3333H23.5007C22.8567 15.3333 22.334 14.8107 22.334 14.1667V9.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.334 19.0833H22.334"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.334 22.5833H22.334"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.334 26.0833H20.3857"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const PDFIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#E82A2A" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4837 13.483L24.1843 10.1837C23.7468 9.74617 23.153 9.5 22.5347 9.5H14.1673C12.8782 9.5 11.834 10.5442 11.834 11.8333V28.1667C11.834 29.4558 12.8782 30.5 14.1673 30.5H25.834C27.1232 30.5 28.1673 29.4558 28.1673 28.1667V15.1327C28.1673 14.5143 27.9212 13.9205 27.4837 13.483V13.483Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.1673 15.3333H23.5007C22.8567 15.3333 22.334 14.8107 22.334 14.1667V9.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.0625 25.3079H21.9358"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.6387 20.8758V19.5132C18.6387 19.1375 18.9432 18.833 19.3188 18.833H20.6815C21.0572 18.833 21.3617 19.1375 21.3617 19.5132V20.8758C21.3617 21.2515 21.0572 21.556 20.6815 21.556H19.3188C18.9432 21.5548 18.6387 21.2503 18.6387 20.8758Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.334 26.3202V24.9575C15.334 24.5818 15.6385 24.2773 16.0142 24.2773H17.3768C17.7525 24.2773 18.057 24.5818 18.057 24.9575V26.3202C18.057 26.6958 17.7525 27.0003 17.3768 27.0003H16.0142C15.6385 27.0003 15.334 26.6958 15.334 26.3202Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.9453 26.3202V24.9575C21.9453 24.5818 22.2498 24.2773 22.6255 24.2773H23.9881C24.3638 24.2773 24.6683 24.5818 24.6683 24.9575V26.3202C24.6671 26.6958 24.3626 27.0003 23.987 27.0003H22.6243C22.2498 27.0003 21.9453 26.6958 21.9453 26.3202H21.9453Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.6132 24.2807L20.8516 21.5273"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.3867 24.2807L19.1484 21.5273"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const HTMLIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#8E44AD" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.6231 29.7077L26.5309 26.9032C27.722 26.2232 28.532 25.031 28.7253 23.6732L29.9531 15.0744C30.3364 12.3955 28.2587 10 25.5542 10H14.4454C11.741 10 9.66322 12.3955 10.0454 15.0733L11.251 23.5132C11.4577 24.9621 12.3654 26.2166 13.6776 26.8666L19.5343 29.7688C20.1976 30.0976 20.9809 30.0743 21.6231 29.7077V29.7077Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.5564 22.2221L15.6797 23.0865L20.0008 25.5554L24.3219 23.0865L24.9219 18.8888H15.0798L14.4453 14.4443H25.5564"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const FILEIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#7F8C8D" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.4837 13.483L24.1843 10.1837C23.7468 9.74617 23.153 9.5 22.5347 9.5H14.1673C12.8782 9.5 11.834 10.5442 11.834 11.8333V28.1667C11.834 29.4558 12.8782 30.5 14.1673 30.5H25.834C27.1232 30.5 28.1673 29.4558 28.1673 28.1667V15.1327C28.1673 14.5143 27.9212 13.9205 27.4837 13.483V13.483Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.1673 15.3333H23.5007C22.8567 15.3333 22.334 14.8107 22.334 14.1667V9.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const AttachmentIcons = {
  CSV: CSVIcon,
  XLS: XLSIcon,
  DOC: DOCIcon,
  PDF: PDFIcon,
  HTML: HTMLIcon,
  FILE: FILEIcon,
};

const MiniAudioIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3334 10V6M8.00002 11.3333V4.66667M5.33335 14V2M2.66669 10.6667V5.33333M10.6667 12.6667V3.33333"
      stroke="#4A9CA6"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MiniVideoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.33331 5.33333H14.6666M3.99998 5.33333L5.33331 2M7.33331 5.33333L8.66665 2M10.6666 5.33333L12 2M13.3333 14H2.66665C2.31299 14.0001 1.9738 13.8597 1.72373 13.6096C1.47366 13.3595 1.33322 13.0203 1.33331 12.6667V3.33333C1.33322 2.97968 1.47366 2.64049 1.72373 2.39042C1.9738 2.14035 2.31299 1.9999 2.66665 2H13.3333C13.687 1.9999 14.0262 2.14035 14.2762 2.39042C14.5263 2.64049 14.6667 2.97968 14.6666 3.33333V12.6667C14.6667 13.0203 14.5263 13.3595 14.2762 13.6096C14.0262 13.8597 13.687 14.0001 13.3333 14ZM6.74835 10.8994V8.43395C6.74838 8.27908 6.83104 8.13601 6.96518 8.05862C7.09932 7.98124 7.26456 7.98131 7.39864 8.05881L9.53183 9.29153C9.66582 9.36894 9.74835 9.51193 9.74835 9.66667C9.74835 9.82141 9.66582 9.9644 9.53183 10.0418L7.39865 11.2745C7.26457 11.352 7.09933 11.3521 6.96518 11.2747C6.83104 11.1973 6.74838 11.0543 6.74835 10.8994Z"
      stroke="#4A9CA6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MiniOtherIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.25269 5.58319L5.59535 9.24052C5.04469 9.79119 5.04469 10.6845 5.59535 11.2352C6.14602 11.7859 7.03936 11.7859 7.59002 11.2352L12.4114 6.41386C13.4214 5.40386 13.4214 3.76652 12.4114 2.75652C11.4014 1.74652 9.76402 1.74652 8.75402 2.75652L3.93269 7.57786C2.46336 9.04719 2.46336 11.4285 3.93269 12.8979C5.40202 14.3672 7.78335 14.3672 9.25269 12.8979L12.1787 9.97186"
      stroke="#4A9CA6"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MiniImageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.91957 6.77851C10.9576 7.81652 10.9576 9.49948 9.91957 10.5375C8.88156 11.5755 7.1986 11.5755 6.16059 10.5375C5.12258 9.49948 5.12258 7.81652 6.16059 6.77851C7.1986 5.7405 8.88156 5.7405 9.91957 6.77851"
      stroke="#4A9CA6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 6.00033V12.0003C14 12.737 13.4033 13.3337 12.6667 13.3337H3.33333C2.59667 13.3337 2 12.737 2 12.0003V6.00033C2 5.26366 2.59667 4.66699 3.33333 4.66699H4.66667L5.64133 2.99766C5.76067 2.79299 5.98 2.66699 6.21733 2.66699H9.75333C9.98733 2.66699 10.204 2.78966 10.3247 2.98966L11.3333 4.66699H12.6667C13.4033 4.66699 14 5.26366 14 6.00033Z"
      stroke="#4A9CA6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MiniAttachmentIcons = {
  audios: MiniAudioIcon,
  videos: MiniVideoIcon,
  others: MiniOtherIcon,
  images: MiniImageIcon,
};

export {
  PlayIcon,
  PauseIcon,
  InfoIcon,
  DownFilledArrowIcon,
  AttachmentIcons,
  MiniAttachmentIcons,
};
