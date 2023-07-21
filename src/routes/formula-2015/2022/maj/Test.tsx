import {
	AnswerBtn,
	TestRadio,
	TestProvider,
	TestImg,
} from '../../../../context/testContext';
import { usePathElements } from '../../../../redux/slices/pathSlice';

import zadanie3 from './img/3.png';
import polecenie1 from './img/3-1.png';
import polecenie2 from './img/3-2.png';
import polecenie3 from './img/3-3.png';
import sql from './img/sql.png';
import Table from '../../../../components/Table';

const Test = () => {
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	return (
		<>
			<TestProvider taskNum={3} title='Test'>
				<TestImg img={zadanie3} />
			</TestProvider>
			<TestProvider taskNum={3.1} pkt={1}>
				<TestImg img={polecenie1} />
				<Table
					className='[&>.col-1]:font-bold [&>.col-2]:text-left'
					cols={3}
					__manualSizes='min-content 4fr 1fr'>
					<div>1.</div>
					<div>liniowa.</div>
					<div>
						<TestRadio num={1} />
					</div>

					<div>2.</div>
					<div>kwadratowa.</div>
					<div>
						<TestRadio num={2} positive />
					</div>

					<div>3.</div>
					<div>n log n.</div>
					<div>
						<TestRadio num={3} />
					</div>

					<div>4.</div>
					<div>nie większa niż sześcienna.</div>
					<div>
						<TestRadio num={4} positive />
					</div>
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={3.2} pkt={1}>
				<TestImg img={polecenie2} />
				<Table
					cols={3}
					__manualSizes='min-content 4fr 1fr'
					className='[&>.col-1]:font-bold [&>.col-2]:text-left'>
					<p>1. </p>
					<div>
						1111011<sub>2</sub>
					</div>
					<TestRadio num={1} />
					<p>2. </p>
					<div>
						362<sub>8</sub>
					</div>
					<TestRadio num={2} />
					<p>3. </p>
					<div>
						F3<sub>16</sub>
					</div>
					<TestRadio num={3} positive />
					<p>4. </p>
					<div>
						3303<sub>4</sub>
					</div>
					<TestRadio num={4} positive />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={3.3} pkt={1}>
				<TestImg img={polecenie3} />
				<TestImg className='mx-auto h-52' img={sql} />
				<Table
					cols={3}
					className='[&>.col-2]:text-left [&>.col-2]:justify-start [&>.col-1]:font-bold'
					__manualSizes='min-content 4fr 1fr'>
					1.
					<div>
						Wynikiem zapytania:
						<div className='pl-4'>
							<code>
								<b>SELECT</b> id_osoby, sum(punkty) <br /> <b>FROM</b> mandaty{' '}
								<br /> <b>GROUP BY</b> id_osoby <br /> <b>HAVING</b> sum(punkty)
								&gt; 5
							</code>
						</div>
						jest zestawienie:
						<div className='pl-4'>
							1 14 <br /> 2 20 <br /> 3 21
						</div>
					</div>
					<TestRadio num={1} />
					2.
					<div>
						Wynikiem zapytania:
						<div className='pl-4'>
							<code>
								<b>SELECT</b> id_osoby, sum(punkty) <br /> <b>FROM</b> mandaty{' '}
								<br /> <b>GROUP</b> BY id_osoby
							</code>
						</div>
						jest zestawienie:
						<div className='pl-4'>
							1 21 <br /> 2 21 <br /> 3 21
						</div>
					</div>
					<TestRadio num={2} positive />
					3.
					<div>
						Wynikiem zapytania:
						<div className='pl-4'>
							<code>
								<b>SELECT</b> numer + punkty <br /> <b>FROM</b> mandaty
							</code>
						</div>
						jest
						<div className='pl-4'>86</div>
					</div>
					<TestRadio num={3} />
					4.
					<div>
						Wynikiem zapytania:
						<div className='pl-4'>
							<code>
								<b>SELECT</b> count(punkty) <br /> <b>FROM</b> mandaty
								<br /> <b>WHERE</b> punkty = 21
							</code>
						</div>
						jest
						<div className='pl-4'>1</div>
					</div>
					<TestRadio num={4} positive />
				</Table>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Test;
