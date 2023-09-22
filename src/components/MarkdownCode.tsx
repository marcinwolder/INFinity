import React from "react";

const MarkdownPre: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <code className="inline-block">{children}</code>;
};

export default MarkdownPre;
