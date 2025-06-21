import React from 'react';

interface WaterProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
}

const Water: React.FC<WaterProps> = ({ width = 68, height = 92, color = "var(--foreground)", className }) => {
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
        d="M49.2001 57C48.6001 68.7 48.0001 82.7 48.0001 82.7C47.9001 84.7 46.5001 86.7 43.9001 88.2C38.4001 91.4 29.6001 91.4 24.1001 88.2C21.5001 86.7 20.1001 84.7 20.0001 82.7C20.0001 82.7 18.4001 50.3 18.1001 42.8"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.1001 9.40002C53.7001 11.5 55.1001 14 55.1001 16.5C55.1001 16.5 55.1001 25.2 55.1001 30"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.3998 45.2C30.9998 45.8 24.2998 44.7 19.2998 41.9"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 31.3C13 26.9 13 16.5 13 16.5C13 13.4 15.1 10.3 19.2 7.89999C19.6 7.69999 20 7.49999 20.4 7.29999"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.5002 23.8C50.8002 24.4 49.9002 25.1 48.9002 25.6C40.7002 30.3 27.4002 30.3 19.1002 25.6C18.2002 25.1 17.4002 24.5 16.7002 24"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.7002 14.1C22.3002 14.7 23.0002 15.2 23.8002 15.7C29.4002 18.9 38.5002 18.9 44.1002 15.7C45.0002 15.2 45.8002 14.6 46.4002 13.9"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8001 8.4C20.3001 6.8 21.6001 5.2 23.8001 3.9C29.4001 0.7 38.5001 0.7 44.1001 3.9C46.3001 5.2 47.6001 6.7 48.1001 8.4L50.0001 14.9C50.9001 17.8 49.4001 20.9 45.5001 23.2C39.1001 26.9 28.8001 26.9 22.4001 23.2C18.5001 20.9 17.0001 17.8 17.9001 14.9L19.8001 8.4Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.6 40.5C1.6 40.2 1.5 40 1.5 39.7C1.5 38.6 1.9 37.9 2.5 37.5C3.1 37.2 3.9 37.2 4.9 37.7C6.7 38.8 8.2 41.3 8.2 43.5C8.2 44.6 7.8 45.3 7.2 45.7C6.8 45.9 6.2 46 5.6 45.8C5.6 45.8 2 44.6 1.6 40.5Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 37.6L16.7 29.4C17.3 29.1 18.1 29.1 19.1 29.6C20.9 30.7 22.4 33.2 22.4 35.4C22.4 36.5 22 37.2 21.4 37.6L7.2 45.8"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.2002 9.50003L60.8002 4.00003C61.4002 3.70003 62.2002 3.70003 63.2002 4.20003C65.0002 5.30003 66.5002 7.80003 66.5002 10C66.5002 11.1 66.1002 11.8 65.5002 12.2C65.5002 12.2 61.0002 14.8 57.9002 16.5"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.8002 69.5L21.7002 43.2"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.2002 69.5C45.2002 69.5 45.4002 64.4 45.6002 58.8"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.2998 71.5L28.7998 45.1"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.7002 71.5C38.7002 71.5 38.9002 60.1 39.0002 52.2"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 30.5L56.4 41C57.1 42.1 57.5 43.5 57.5 44.9C57.5 49 54.1 52.4 50 52.4C45.9 52.4 42.5 49 42.5 44.9C42.5 43.5 42.9 42.1 43.6 41L50 30.5Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.0001 47.4C46.4001 46.7 46.1001 45.9 46.1001 44.9C46.1001 44.2 46.3001 43.5 46.7001 42.9C46.7001 42.9 46.8001 42.8 46.9001 42.6"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48.6001 39.7C48.8001 39.3 49.1001 38.9 49.3001 38.6"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Water;