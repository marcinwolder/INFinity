import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

const MarkdownPre: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLPreElement>(null);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const cb = () => {
      if (ref.current && ref.current.firstElementChild) {
        setScroll(
          ref.current.clientWidth < ref.current.firstElementChild.clientWidth,
        );
      }
    };

    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);
  return (
    <pre
      ref={ref}
      className={clsx("w-0 min-w-full", { "overflow-x-scroll": scroll })}
    >
      {children}
    </pre>
  );
};

export default MarkdownPre;
