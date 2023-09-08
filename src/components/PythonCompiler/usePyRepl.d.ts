import React, { ForwardedRef } from "react";

type setSrc = (prevSrc: string) => string;

export default (): [
  React.FC<React.PropsWithRef & React.PropsWithChildren & { output: string }>,
  setSrc,
] => [
  React.FC<React.PropsWithRef & React.PropsWithChildren & { output: string }>,
  setSrc,
];
