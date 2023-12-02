import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const hash = location.hash;
    const removeHashCharacter = (str: string) => {
      return str.slice(1);
    };
    return hash ? document.getElementById(removeHashCharacter(hash)) : null;
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      });
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHashElement;
