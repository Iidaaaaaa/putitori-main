import { useState } from "react";

const useAccordion = (initialState = false) => {
  const [Accordion, setAccordion] = useState(initialState);

  const ClickAccrdion = () => {
    setAccordion(!Accordion);
  };

  return [Accordion, ClickAccrdion];
};

export default useAccordion;
