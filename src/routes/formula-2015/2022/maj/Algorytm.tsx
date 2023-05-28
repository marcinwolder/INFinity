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
				<Table>
					<thead>
						<tr>
							<th>n</th>
							<th>ciąg</th>
							<th>liczba elementów do podmiany</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>3</td>
							<td>(1, 3, 1)</td>
							<td>1</td>
						</tr>
						<tr>
							<td>4</td>
							<td>(1, 4, 2, 5)</td>
							<td>
								<TestInput num={1} answer='1' />
							</td>
						</tr>
						<tr>
							<td>5</td>
							<td>(2, 2, 2, 2, 2)</td>
							<td>
								<TestInput num={2} answer='4' />
							</td>
						</tr>
						<tr>
							<td>4</td>
							<td>(4, 3, 2, 1)</td>
							<td>
								<TestInput num={3} answer='0' />
							</td>
						</tr>
						<tr>
							<td>6</td>
							<td>(5, 4, 1, 5, 6, 8)</td>
							<td>
								<TestInput num={4} answer='2' />
							</td>
						</tr>
						<tr>
							<td>6</td>
							<td>(8, 4, 9, 6, 5, 7)</td>
							<td>
								<TestInput num={5} answer='3' />
							</td>
						</tr>
					</tbody>
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
