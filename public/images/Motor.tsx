import React from 'react';

interface MotorProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
}

const Motor: React.FC<MotorProps> = ({ width = 85, height = 95, color="var(--foreground)",className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M79.1123 59.8769L44.0923 80.0969"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5824 71.0269L5.69238 82.5069"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.6124 63.9769L1.73242 75.4569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2926 39.5369L22.6826 42.8969"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.53271 44.5869L10.4527 42.6369C18.0827 38.2269 30.4527 45.3669 38.0727 58.5769C45.6927 71.7869 45.6927 86.0669 38.0627 90.4669L35.1427 92.4169"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.8623 80.1369C17.5023 90.9569 28.2623 96.3969 35.1523 92.4169C40.2823 89.4569 41.9623 82.0369 40.2023 73.4769"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5324 45.4969C15.8124 42.9969 11.1424 42.5069 7.53241 44.5869C0.562411 48.6069 -0.0475888 60.8769 5.71241 73.0269"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0027 80.5969C21.7227 85.2869 27.2127 87.2469 30.9927 85.0569C36.2127 82.0369 36.2227 72.2669 30.9927 63.2369C25.7727 54.1969 17.3127 49.3169 12.0927 52.3369C8.34268 54.5069 7.28268 60.1569 8.92268 66.5269"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9824 77.9569C24.2324 81.3869 27.9024 83.5269 31.1524 83.8869"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6727 52.1369C12.6827 54.8169 12.2527 59.1869 13.4027 64.0169"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M71.4725 64.2369C77.4025 60.8169 77.4025 49.7269 71.4725 39.4669C71.1825 38.9669 70.8925 38.4769 70.5825 38.0069"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46.5926 78.5869C52.5226 75.1669 52.5226 64.0769 46.5926 53.8169C46.3026 53.3169 46.0126 52.8269 45.7026 52.3569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79.0925 59.7369C85.0225 56.3169 85.0225 45.2269 79.0925 34.9669C76.7525 30.9169 73.8425 27.6069 70.8125 25.2869"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.1323 71.5069L71.0123 59.9369L70.0523 59.0469"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.2227 66.0969L71.1027 54.5369L70.1427 53.6369"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50.3325 61.3169L70.2225 49.7569L69.2525 48.8569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48.3027 56.9769L68.1827 45.4169L67.2227 44.5169"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.7126 70.9769C26.8226 70.3369 26.8226 68.2569 25.7126 66.3269C24.6026 64.3969 22.7926 63.3569 21.6826 63.9969"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.8625 77.7569C4.7525 75.8269 2.9425 74.7869 1.8325 75.4269C0.7225 76.0669 0.7225 78.1469 1.8325 80.0769C2.9425 82.0069 4.7525 83.0469 5.8625 82.4069C6.9725 81.7669 6.9725 79.6869 5.8625 77.7569Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.6724 16.9869L45.1524 27.0769L70.0924 12.4569L51.2424 1.71692L26.2324 16.1569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.2324 16.1569V30.0169L28.0724 35.1569L41.5824 42.9469L45.1524 41.3269"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.1523 41.3269V27.0769"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.0925 12.4569V23.9769L68.2725 28.0769"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.3389 24.6838C65.3223 22.9813 65.3208 21.1398 64.3356 20.5708C63.3504 20.0018 61.7546 20.9207 60.7713 22.6232C59.7879 24.3258 59.7894 26.1672 60.7746 26.7363C61.7597 27.3053 63.3556 26.3864 64.3389 24.6838Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54.6716 28.8309C55.4809 27.4297 55.4819 25.9153 54.6736 25.4485C53.8654 24.9817 52.5541 25.7392 51.7447 27.1404C50.9354 28.5417 50.9345 30.0561 51.7427 30.5229C52.551 30.9897 53.8623 30.2322 54.6716 28.8309Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.5825 42.9469V46.8969"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2925 35.5869V39.5369L41.6725 47.3469L68.2125 31.7769L68.2725 28.0769"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.1625 37.2569L50.0825 42.0869"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55.0024 34.9869L53.9224 39.8169"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.9626 32.7169L57.8726 37.5569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.9726 30.3969L61.8926 35.2269"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M63.6025 70.3669L67.5725 72.6869L75.4525 68.0669L75.4725 62.0469"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.6924 79.6769L51.6624 81.9969L59.5424 77.3769L59.5624 71.3669"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Motor;