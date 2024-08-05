import React, { useEffect } from "react";

interface IModelToggle {
  children: React.ReactNode;
  elementRef: React.RefObject<HTMLElement>;
  openIconRef: React.RefObject<HTMLElement>;
  closeIconRef: React.RefObject<HTMLElement>;
}
const ModelToggle: React.FC<IModelToggle> = ({
  children,
  closeIconRef,
  elementRef,
  openIconRef,
}) => {
  const docClickHandler = (e: globalThis.MouseEvent) => {
    if (
      elementRef.current &&
      openIconRef.current &&
      closeIconRef.current &&
      e.target instanceof Element
    ) {
      // console.log( elementRef.current)
      // console.log( openIconRef.current)
      // console.log( closeIconRef.current)
      if (
        openIconRef.current.contains(e.target) &&
        !openIconRef.current.classList.contains("hidden")
      ) {
        openIconRef.current.classList.add("hidden");
        closeIconRef.current.classList.remove("hidden");
        elementRef.current.classList.toggle("hidden");
        return;
      }
      if (
        closeIconRef.current.contains(e.target) &&
        !closeIconRef.current.classList.contains("hidden")
      ) {
        closeIconRef.current.classList.add("hidden");
        openIconRef.current.classList.remove("hidden");
        elementRef.current.classList.toggle("hidden");
        return;
      }
      if (
        !elementRef.current.contains(e.target) &&
        openIconRef.current.classList.contains("hidden")
      ) {
        elementRef.current.classList.toggle("hidden");
        openIconRef.current.classList.remove("hidden");
        closeIconRef.current.classList.add("hidden");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", docClickHandler);
    return () => {
      document.removeEventListener("click", docClickHandler);
    };
  }, []);
  return children;
};

export default ModelToggle;
