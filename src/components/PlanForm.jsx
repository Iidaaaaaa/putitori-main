import React, { useState } from "react";
// Hooksのインポート
import useAccordion from "@hooks/useAccordion";
// Assetsのインポート
import UnderVector from "@assets/UnderVector";

const PlanForm = ({
  text,
  Icon,
  Vector = <UnderVector />,
  padding = "p-5",
  Accordion,
  disableAccordion = false,
}) => {
  const [isAccordionOpen, toggleAccordion] = useAccordion();
  const [selectedText, setSelectedText] = useState(text);

  const handleSelect = (newText) => {
    setSelectedText(newText);
    toggleAccordion();
  };

  return (
    <div className="mt-[10px] bg-[#ebebeb] rounded-[20px]">
      <div
        className={`flex items-center justify-between ${padding}`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {Icon}
          <p className="ml-2 text-xs">{selectedText}</p>
        </div>
        {Vector}
      </div>
      {!disableAccordion && isAccordionOpen && Accordion && (
        <div className=" mt-2 p-4 bg-[#ff0000] rounded-2xl">
          {React.isValidElement(Accordion) &&
            React.cloneElement(Accordion, {
              onSelect: handleSelect,
              selectedValue: selectedText,
            })}
        </div>
      )}
    </div>
  );
};

export default PlanForm;
