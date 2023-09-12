import { forwardRef, useState } from "react";

export const usePyRepl = () => {
  const [src, setSrc] = useState("");
  return [
    forwardRef(({ children, output }, ref) => {
      return (
        <py-repl
          onKeyDownCapture={function (e) {
            if (e.key === "Tab") {
              const editor =
                ref.current.children[0].children[0].children[0].shadowRoot
                  .children[1].children[1].children[1];
              let snippet = false;
              [...editor.children].forEach((line) => {
                if (
                  line.querySelector(".cm-snippetField") ||
                  line.querySelector(".cm-snippetFieldPosition")
                )
                  snippet = true;
              });
              if (!snippet) e.preventDefault();
            }
          }}
          output={output}
          output-mode="append"
          ref={ref}
        >
          {src || children}
        </py-repl>
      );
    }),
    setSrc,
  ];
};

export default usePyRepl;
