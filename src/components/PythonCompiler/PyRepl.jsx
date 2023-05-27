import React, { forwardRef } from 'react';

export const PyRepl = forwardRef(({ children, output }, ref) => {
	return (
		<py-repl ref={ref} output={output}>
			{children}
		</py-repl>
	);
});

export default PyRepl;
