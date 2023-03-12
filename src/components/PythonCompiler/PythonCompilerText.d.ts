import React from 'react';
export default React.Component<
	React.PropsWithChildren<{
		disabled: boolean;
		setResult: (result: string, repl: string) => void;
		syncFunc: (replRef: React.MutableRefObject<HTMLDivElement>) => void;
	}>
>;
