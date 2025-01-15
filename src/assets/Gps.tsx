import * as React from "react";
import { CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
  color?: string;
  width?: string | number;
  height?: string | number;
}

const Gps: React.FC<PropsType> = (props) => {
  const { style, color = "white", width = 16, height = 16 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M0.503122 8.13125C-0.203128 8.53437 -0.137503 9.60937 0.615622 9.92187L5 11.75V14.9781C5 15.5437 5.45625 16 6.02187 16C6.325 16 6.6125 15.8656 6.80625 15.6312L8.74375 13.3094L12.6156 14.9219C13.2062 15.1687 13.8906 14.7812 13.9875 14.15L15.9875 1.15C16.0469 0.771872 15.8812 0.390622 15.5656 0.174997C15.25 -0.0406276 14.8375 -0.0593776 14.5031 0.131247L0.503122 8.13125ZM2.13125 8.92812L12.8031 2.83125L5.94062 10.5L5.97812 10.5312L2.13125 8.92812ZM12.6031 13.2937L7.39687 11.1219L14.0875 3.64375L12.6031 13.2937Z"
        fill={color}
      />
    </svg>
  );
};

export default Gps;
