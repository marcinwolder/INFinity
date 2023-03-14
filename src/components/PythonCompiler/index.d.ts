import React from 'react';
export default React.Component<{
	dataPath: string;
	testPath?: string;
	setResult: React.Dispatch<React.SetStateAction<string>>;
}>;

import React from 'react';
export default React.Component<{
	dataPath: string;
	testPath?: string;
	disabled: boolean;
	setResult: (result: string, repl: string) => void;
	syncFunc: (replRef: React.MutableRefObject<HTMLDivElement>) => void;
}>;
