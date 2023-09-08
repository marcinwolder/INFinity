import React, { forwardRef } from "react";

export const PyTerminal = forwardRef(({ children, id }, ref) => {
  return (
    <py-terminal id={id} ref={ref}>
      {children}
    </py-terminal>
  );
});

export default PyTerminal;
