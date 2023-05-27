import { MutableRefObject } from 'react';

interface onClickRunProps {
	replRef;
	terminalRef;
	setResult;
	callback;
}

export const onClickRun = ({
	replRef,
	terminalRef,
	setResult,
	callback,
}: onClickRunProps) => {
	const replContent =
		replRef.current.children[0].children[1].children[0].children[1].children[1]
			.innerHTML;
	const btn = replRef.current.children[0].children[1].children[2];
	terminalRef.current.children[0].innerText = '';
	btn.click();
	setResult(terminalRef.current.children[0].innerText, replContent);
	callback();
};

updateAnsw(dispatch, {
	answers: {
		[taskNum]: replContent,
	},
	formula: maturaPath.formula,
	date: maturaPath.date,
});
