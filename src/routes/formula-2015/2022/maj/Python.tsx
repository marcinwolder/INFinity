import { AnswerBtn, TestProvider } from '../../../../context/testContext';

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
				<AnswerBtn />
			</TestProvider>
			{/* <TestProvider taskNum={1.2} pkt={4}>
				<img src={polecenie2} draggable={false} className='pt-2 select-none' />
				<TestPythonText
					tests={[
						{ input: [3, [0, 1, 3, 1]], output: 1 },
						{ input: [4, [0, 1, 4, 2, 5]], output: 1 },
						{ input: [5, [0, 2, 2, 2, 2, 2]], output: 4 },
						{ input: [4, [0, 4, 2, 3, 1]], output: 0 },
						{ input: [6, [0, 5, 4, 1, 5, 6, 8]], output: 2 },
						{ input: [6, [0, 8, 4, 9, 6, 5, 7]], output: 3 },
					]}
					dane={['n, A']}
					num={1}
				/>
				<AnswerBtn />
			</TestProvider> */}
		</>
	);
};

export default Python;
