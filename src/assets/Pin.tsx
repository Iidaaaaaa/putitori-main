import * as React from "react";
import { CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
  color?: string;
  width?: string | number;
  height?: string | number;
}

const Pin: React.FC<PropsType> = (props) => {
  const { style, color = "#919191", width = 23, height = 23 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g clipPath="url(#clip0_4_51)">
        <path
          d="M18.6875 9.10419C18.6875 14.375 11.5 21.0834 11.5 21.0834C11.5 21.0834 4.3125 14.375 4.3125 9.10419C4.3125 7.19794 5.06975 5.36977 6.41767 4.02186C7.76559 2.67394 9.59376 1.91669 11.5 1.91669C13.4062 1.91669 15.2344 2.67394 16.5823 4.02186C17.9302 5.36977 18.6875 7.19794 18.6875 9.10419Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 11.5C12.8232 11.5 13.8958 10.4273 13.8958 9.10415C13.8958 7.78096 12.8232 6.70831 11.5 6.70831C10.1768 6.70831 9.10416 7.78096 9.10416 9.10415C9.10416 10.4273 10.1768 11.5 11.5 11.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_51">
          <rect width="23" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Pin;
