import React, { forwardRef } from 'react';

export const PyRepl = forwardRef(({ children }, ref) => {
	return <py-terminal ref={ref}>{children}</py-terminal>;
});

export default PyRepl;
