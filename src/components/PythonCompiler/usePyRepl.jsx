import { forwardRef, useState } from 'react';

export const usePyRepl = () => {
	const [src, setSrc] = useState('');
	return [
		forwardRef(({ children, output }, ref) => {
			console.log(output);
			return (
				<py-repl output={output} ref={ref}>
					{src || children}
				</py-repl>
			);
		}),
		setSrc,
	];
};

export default usePyRepl;
