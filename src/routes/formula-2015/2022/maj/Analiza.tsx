import {
	AnswerBtn,
	TestProvider,
	TestInput,
} from '../../../../context/testContext';
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
				<Table
					headings={['n', 's', 'wynik działania algorytmu (wartkość k)']}
					className='[&>.col-2]:justify-start'
					__manualSizes='min-content min-content 1fr'>
					<>5</>
					aabab
					<>4</>
					<>2</>
					ab
					<p>2</p>
					<>3</>
					aaa
					<p>3</p>
					<>4</>
					aababb
					<TestInput num={1} answer={'5'} />
					<>9</>
					baabbaaab
					<TestInput num={2} answer={'6'} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={2.2} pkt={2}>
				<TaskImg img={polecenie2} />
				<Table
					headings={['n', 's', 'wynik działania algorytmu (wartość k)']}
					__manualSizes='min-content auto max-content'>
					<>10</>
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
					<>10</>
					<>10</>
					<TestInput
						num={2}
						answer={(str) => {
							const log = { a: 0, b: 0 };
							for (const letter of str) {
								log[letter as 'a' | 'b']++;
								if (log.a > log.b) return false;
							}
							if (log.a !== 5 || log.b !== 5) return false;
							return true;
						}}
					/>
					<>5</>
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={2.3} pkt={2}>
				<TaskImg img={polecenie3} />
				<Table cols={2} __manualSizes='max-content auto'>
					<>k = </>
					<TestInput
						num={1}
						answer={(str) => str === '990' || str === '967' || str === '989'}
					/>
				</Table>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Analiza;
