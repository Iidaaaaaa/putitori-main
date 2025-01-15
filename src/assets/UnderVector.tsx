import * as React from "react";
import { CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
  color?: string;
  width?: string | number;
  height?: string | number;
}

const UnderVector: React.FC<PropsType> = (props) => {
  const { style, color = "#919191", width = 12, height = 8 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M5.29377 7.43788C5.6844 7.85292 6.31877 7.85292 6.7094 7.43788L11.7094 2.12538C12.1 1.71034 12.1 1.03632 11.7094 0.621277C11.3188 0.206238 10.6844 0.206238 10.2938 0.621277L6.00002 5.18339L1.70627 0.624597C1.31565 0.209558 0.681274 0.209558 0.290649 0.624597C-0.0999756 1.03964 -0.0999756 1.71366 0.290649 2.1287L5.29065 7.4412L5.29377 7.43788Z"
        fill={color}
      />
    </svg>
  );
};

export default UnderVector;
