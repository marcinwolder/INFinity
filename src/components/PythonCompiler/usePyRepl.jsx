import { forwardRef, useState } from "react";

export const usePyRepl = () => {
  const [src, setSrc] = useState("");
  return [
    forwardRef(({ children, output }, ref) => {
      return (
        <py-repl output={output} output-mode="append" ref={ref}>
          {src || children}
        </py-repl>
      );
    }),
    setSrc,
  ];
};

export default usePyRepl;
