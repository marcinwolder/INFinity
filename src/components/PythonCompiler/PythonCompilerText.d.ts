import React from 'react';
export default React.Component<
	React.PropsWithChildren<{
		setResult: (result: string, repl: string) => void;
		syncFunc: (replRef: React.MutableRefObject<HTMLDivElement>) => void;
	}>
>;
