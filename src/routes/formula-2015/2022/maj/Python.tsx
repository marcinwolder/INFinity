import {
	AnswerBtn,
	TestProvider,
	TestPython,
} from '../../../../context/testContext';

import zadanie4 from './img/4.png';
import polecenie1 from './img/4-1.png';

const Python = () => {
	return (
		<>
			<TestProvider taskNum={4} title='Liczby'>
				<img src={zadanie4} draggable={false} className='pt-2 select-none' />
			</TestProvider>
			<TestProvider taskNum={4.1} pkt={4}>
				<img src={polecenie1} draggable={false} className='pt-2 select-none' />
				<TestPython
					num={1}
					terminal
					tests={'18\n93639'}
					dataPath='formula-2015/2022/maj/liczby.txt'
					testPath='formula-2015/2022/maj/przyklad.txt'
				/>
				<AnswerBtn syncOnClick={false} />
			</TestProvider>
		</>
	);
};

export default Python;
