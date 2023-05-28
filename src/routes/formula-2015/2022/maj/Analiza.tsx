import {
	AnswerBtn,
	TestProvider,
	TestInput,
} from '../../../../context/testContext';
import Tab from '../../../../components/Tab';
import Table from '../../../../components/Table';
import TaskImg from '../../../../components/TaskImg';

import zadanie2 from './img/2.png';
import polecenie1 from './img/2-1.png';
import polecenie2 from './img/2-2.png';
import polecenie3 from './img/2-3.png';

const Analiza = () => {
	return (
		<>
			<TestProvider taskNum={2} title='ab-słowo'>
				<TaskImg img={zadanie2} />
			</TestProvider>
			<TestProvider taskNum={2.1} pkt={2}>
				<TaskImg img={polecenie1} />
				<Table>
					<thead>
						<tr>
							<th>n</th>
							<th>s</th>
							<th>Wynik działania algorytmu (wartość k)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>5</td>
							<td>aabab</td>
							<td>4</td>
						</tr>
						<tr>
							<td>2</td>
							<td>ab</td>
							<td>2</td>
						</tr>
						<tr>
							<td>3</td>
							<td>aaa</td>
							<td>3</td>
						</tr>
						<tr>
							<td>6</td>
							<td>aababb</td>
							<td>
								<TestInput num={1} answer={'5'} />
							</td>
						</tr>
						<tr>
							<td>9</td>
							<td>baabbaaab</td>
							<td>
								<TestInput num={2} answer={'6'} />
							</td>
						</tr>
					</tbody>
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={2.2} pkt={2}>
				<TaskImg img={polecenie2} />
				<Table>
					<thead>
						<tr>
							<th>n</th>
							<th>s</th>
							<th>Wynik działania algorytmu (wartość k)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>10</td>
							<td>
								<TestInput
									num={1}
									answer={(str) => {
										str = str.toLowerCase();
										if (str.length !== 10) return false;
										let firstB = str.indexOf('b');
										firstB = firstB === -1 ? str.length : firstB;
										for (let i = 0; i < str.length; i++) {
											if (i < firstB && str[i] !== 'a') return false;
											if (i >= firstB && str[i] !== 'b') return false;
										}
										return true;
									}}
								/>
							</td>
							<td>10</td>
						</tr>
						<tr>
							<td>10</td>
							<td>
								<TestInput
									num={2}
									answer={(str) => {
										const log = { a: 0, b: 0 };
										for (let letter of str) {
											log[letter as 'a' | 'b']++;
											if (log.a > log.b) return false;
										}
										if (log.a !== 5 || log.b !== 5) return false;
										return true;
									}}
								/>
							</td>
							<td>5</td>
						</tr>
					</tbody>
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={2.3} pkt={2}>
				<TaskImg img={polecenie3} />
				<Table>
					<thead>
						<tr>
							<th>k</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<TestInput
									num={1}
									answer={(str) =>
										str === '990' || str === '967' || str === '989'
									}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Analiza;
