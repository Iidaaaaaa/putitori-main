import React from "react";
// Assetsのインポート
import UnderVector from "@assets/UnderVector";

const PlanForm = ({
  text,
  Icon,
  Vector = <UnderVector />,
  padding = "p-5",
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mt-[10px] bg-[#ebebeb] rounded-[20px]">
      <div
        className={`flex items-center justify-between ${padding}`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {Icon}
          <p className="ml-2 text-xs">{text}</p> {/* textを直接表示 */}
        </div>
        {Vector}
      </div>
    </div>
  );
};

export default PlanForm;
