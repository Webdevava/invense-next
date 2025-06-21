import React from 'react';

interface TransformerProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
}

const Transformer: React.FC<TransformerProps> = ({ width = 88, height = 94, color = "var(--foreground)", className }) => {
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
        d="M39.7197 11.9017L57.9097 1.27167L63.4597 4.58167"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79.44 13.7217L86.46 17.8717V59.5717L29.55 92.9617L1.03 76.6517L1 34.5217L11.92 28.1517"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86.4598 17.8717L29.5498 50.9117V92.9617"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60.85 49.4917L60.77 57.4117"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.83008 36.5616L29.5501 50.9117"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.6898 74.8817C43.6898 74.8817 35.3698 77.6417 39.4998 65.0617C39.4998 65.0617 43.4998 55.7917 44.4998 50.6317C44.4998 50.6317 53.2398 50.8717 53.6698 59.8417C53.962 62.1893 53.6242 64.5724 52.691 66.7462C51.7578 68.9201 50.2629 70.8065 48.3598 72.2117C48.3598 72.2117 55.1398 61.3017 46.8798 57.3717C47.2975 60.5527 46.7725 63.7863 45.3698 66.6717C45.3698 66.6717 45.4398 64.6017 43.8798 64.0317C43.8798 64.0317 42.8798 67.1817 42.3798 68.7717C42.3598 68.7717 40.7198 73.4617 43.6898 74.8817Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.5898 32.9717L71.6798 36.9617L67.7598 50.6417L72.4298 47.9517L68.4998 61.8517L80.8298 38.3617L75.0398 41.7017L78.5898 32.9717Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.8896 8.98169V25.0717"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.7998 25.0717V8.98169"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.3498 12.0917C34.8627 12.0917 36.8998 10.6993 36.8998 8.9817C36.8998 7.2641 34.8627 5.8717 32.3498 5.8717C29.8369 5.8717 27.7998 7.2641 27.7998 8.9817C27.7998 10.6993 29.8369 12.0917 32.3498 12.0917Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.8898 25.0817C36.8898 26.8017 34.8898 28.1917 32.3498 28.1917C29.8098 28.1917 27.7998 26.8017 27.7998 25.0817"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.1997 15.5717V31.6517"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1099 31.6517V15.5717"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6599 18.6817C22.1727 18.6817 24.2099 17.2893 24.2099 15.5717C24.2099 13.8541 22.1727 12.4617 19.6599 12.4617C17.147 12.4617 15.1099 13.8541 15.1099 15.5717C15.1099 17.2893 17.147 18.6817 19.6599 18.6817Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.1999 31.6517C24.1999 33.3717 22.1999 34.7717 19.6599 34.7717C17.1199 34.7717 15.1099 33.3717 15.1099 31.6517"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6301 89.0217V71.0917L7.12012 62.0317V80.0317"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6301 75.5917L7.12012 66.5317"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6301 80.0917L7.12012 71.0317"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6301 84.5917L7.12012 75.5317"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50.8001 28.9317C51.292 29.2174 51.8466 29.3777 52.4151 29.3987C52.9836 29.4196 53.5485 29.3004 54.0601 29.0517L56.1201 27.8617C56.6593 27.481 57.0872 26.9634 57.3597 26.3623C57.6322 25.7611 57.7393 25.0981 57.6701 24.4417C57.5675 22.6049 57.0331 20.8182 56.1105 19.2267C55.1879 17.6351 53.903 16.2835 52.3601 15.2817C51.8272 14.8944 51.2008 14.656 50.5452 14.591C49.8897 14.526 49.2287 14.6367 48.6301 14.9117L46.5601 16.1117C46.0747 16.4441 45.6803 16.8928 45.413 17.4168C45.1458 17.9409 45.0141 18.5236 45.0301 19.1117"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.6302 32.4517V23.6417C40.5784 23.1528 40.6576 22.659 40.8596 22.2108C41.0617 21.7627 41.3795 21.3764 41.7802 21.0917L47.0502 18.0917C47.4962 17.8874 47.9883 17.8048 48.4766 17.8522C48.9648 17.8996 49.4318 18.0754 49.8302 18.3617C50.9733 19.1092 51.9247 20.115 52.6074 21.298C53.29 22.481 53.6849 23.8079 53.7602 25.1717C53.812 25.6605 53.7328 26.1544 53.5307 26.6025C53.3286 27.0506 53.0109 27.4369 52.6102 27.7217L49.3602 29.8217L49.3102 32.1517C49.3102 33.7917 47.3802 35.1517 45.0002 35.1517C42.6202 35.1517 40.6802 33.8317 40.6802 32.1517"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72.6201 15.9017C73.1119 16.1833 73.6651 16.3405 74.2315 16.3597C74.7979 16.3788 75.3604 16.2594 75.8701 16.0117L77.9301 14.8217C78.4694 14.4411 78.8973 13.9235 79.1697 13.3223C79.4422 12.7211 79.5493 12.0581 79.4801 11.4017C79.3824 9.56859 78.8533 7.78443 77.9358 6.19444C77.0183 4.60445 75.7384 3.25356 74.2001 2.2517C73.6675 1.85965 73.039 1.61839 72.3809 1.55328C71.7228 1.48817 71.0592 1.60162 70.4412 1.8809 71L68.3601 3.08171C67.8727 3.4139 67.4758 3.8617 67.2062 4.3846  66.9378 4.9089 C56.8201 6.0817"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M51.7803 14.9017L68.8703 5.01167C69.3166 4.80676 69.8096 4.72468 70.2983 4.77391C70.787 4.6426 71.3587 441.6426 71.6503 5.29168C62.7938 6.0364 73.7236 040.2629 74.429 8.22175C75.1125 9.4032 74.5057 10.7291 74.5803 12.0917 55.6321 12.5806 55.7529 12.0744 53.3508 42.5226 74.4307 14.6417"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M74.642 2.25167C74.206 2 25.167 75.3302 1.72167 76.2002 1.25167C76.6466 1.046.76 66.1395 0.964673 76.6282 1.013.89 C78.1169 1.06312 41.5836 1.24186 64.9802 1.53167 C 80.125 2.27739 441.0776 3.441.282 82.7605 4.46616 3.441.441 5.441.977 7.441 8.3417V15.5017"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Transformer;