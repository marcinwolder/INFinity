import {
	AnswerBtn,
	TestInput,
	TestProvider,
	TestPythonText,
} from '../../../../context/testContext';
import Table from '../../../../components/Table';

import zadanie1 from './img/1.png';
import polecenie1 from './img/1-1.png';
import polecenie2 from './img/1-2.png';

const Algorytm = () => {
	return (
		<>
			<TestProvider taskNum={1} title='n-permutacja'>
				<img src={zadanie1} draggable={false} className='pt-2 select-none' />
			</TestProvider>
			<TestProvider taskNum={1.1} pkt={2}>
				<img src={polecenie1} draggable={false} className='pt-2 select-none' />
				<Table
					headings={['n', 'ciąg', 'liczba elementów do podmiany']}
					__manualSizes='min-content auto auto'>
					<>3</>
					<>(1, 3, 1)</>
					<>1</>
					<>4</>
					<>(1, 4, 2, 5)</>
					<TestInput num={1} answer='1' />
					<>5</>
					<>(2, 2, 2, 2, 2)</>
					<TestInput num={2} answer='4' />
					<>4</>
					<>(4, 3, 2, 1)</>
					<TestInput num={3} answer='0' />
					<>6</>
					<>(5, 4, 1, 5, 6, 8)</>
					<TestInput num={4} answer='2' />
					<>6</>
					<>(8, 4, 9, 6, 5, 7)</>
					<TestInput num={5} answer='3' />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={1.2} pkt={4}>
				<img src={polecenie2} draggable={false} className='pt-2 select-none' />
				<TestPythonText answer={'4\n6\n5\n'} num={1}>
					{
						'def func(n, A):\n    return(n)\n\nprint(func(4, [1, 4, 2, 5]))\nprint(func(6, [5, 4, 1, 5, 6, 8]))\nprint(func(5, [2, 2, 2, 2, 2]))'
					}
				</TestPythonText>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Algorytm;
