import {
	AnswerBtn,
	TestProvider,
	TestPython,
} from '../../../../context/testContext';

import zadanie4 from './img/4.png';
import polecenie1 from './img/4-1.png';
import polecenie2 from './img/4-2.png';

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
					tests={['18 93639']}
					parameters={['ilość liczb', 'pierwsza z nich']}
					dataPath='formula-2015/2022/maj/liczby.txt'
					testPath='formula-2015/2022/maj/przyklad.txt'
				/>
				<AnswerBtn syncOnClick={false} />
			</TestProvider>
			<TestProvider taskNum={4.2} pkt={4}>
				<img src={polecenie2} draggable={false} className='pt-2 select-none' />
				<TestPython
					num={1}
					terminal
					parameters={[
						'Liczba - najwięcej czynników',
						'Ilość czynników',
						'Liczba - najwięcej różnych czynników',
						'Ilość różnych czynników',
					]}
					tests={['99792 10 62790 6', '20992 10 62790 6', '56064 10 62790 6']}
					dataPath='formula-2015/2022/maj/liczby.txt'
					testPath='formula-2015/2022/maj/przyklad.txt'
				/>
				<AnswerBtn syncOnClick={false} />
			</TestProvider>
		</>
	);
};

export default Python;
