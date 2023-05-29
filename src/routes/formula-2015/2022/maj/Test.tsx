import TaskImg from '../../../../components/TaskImg';
import {
	AnswerBtn,
	TestRadio,
	TestProvider,
} from '../../../../context/testContext';
import { usePathElements } from '../../../../redux/slices/path';

import zadanie3 from './img/3.png';
import polecenie1 from './img/3-1.png';
import polecenie2 from './img/3-2.png';
import polecenie3 from './img/3-3.png';
import sql from './img/sql.png';
import TestTable from '../../../../components/TestTable';

const Test = () => {
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	return (
		<>
			<TestProvider taskNum={3} title='Test'>
				<TaskImg img={zadanie3} />
			</TestProvider>
			<TestProvider taskNum={3.1} pkt={1}>
				<TaskImg img={polecenie1} />
				<TestTable
					className='[&>.col-1]:font-semibold [&>.col-2]:text-left'
					cols={3}
					__manualSizes='min-content auto min-content'>
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
				</TestTable>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn />
				</div>
			</TestProvider>
			<TestProvider taskNum={3.2} pkt={1}>
				<TaskImg img={polecenie2} />
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden rounded-lg'>
						<colgroup>
							<col style={{ width: '3em' }} />
							<col />
							<col style={{ width: '6em' }} />
						</colgroup>
						<tbody>
							<tr>
								<td>
									<b>1.</b>
								</td>
								<td className='text-left'>
									1111011<sub>2</sub>
								</td>
								<td>
									<TestRadio num={1} positive />
								</td>
							</tr>
							<tr>
								<td>
									<b>2.</b>
								</td>
								<td className='text-left'>
									362<sub>8</sub>
								</td>
								<td>
									<TestRadio num={2} positive />
								</td>
							</tr>
							<tr>
								<td>
									<b>3.</b>
								</td>
								<td className='text-left'>
									F3<sub>16</sub>
								</td>
								<td>
									<TestRadio num={3} />
								</td>
							</tr>
							<tr>
								<td>
									<b>4.</b>
								</td>
								<td className='text-left'>
									3303<sub>4</sub>
								</td>
								<td>
									<TestRadio num={4} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn />
				</div>
			</TestProvider>
			<TestProvider taskNum={3.3} pkt={1}>
				<TaskImg img={polecenie3} />
				<TaskImg className='mx-auto h-52' img={sql} />
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden rounded-lg'>
						<colgroup>
							<col style={{ width: '3em' }} />
							<col />
							<col style={{ width: '6em' }} />
						</colgroup>
						<tbody>
							<tr>
								<td>
									<b>1.</b>
								</td>
								<td className='text-left'>
									Wynikiem zapytania:
									<div className='pl-4'>
										<code>
											<b>SELECT</b> id_osoby, sum(punkty) <br /> <b>FROM</b>{' '}
											mandaty <br /> <b>GROUP BY</b> id_osoby <br />{' '}
											<b>HAVING</b> sum(punkty) &gt; 5
										</code>
									</div>
									jest zestawienie:
									<div className='pl-4'>
										1 14 <br /> 2 20 <br /> 3 21
									</div>
								</td>
								<td>
									<TestRadio num={1} />
								</td>
							</tr>
							<tr>
								<td>
									<b>2.</b>
								</td>
								<td className='text-left'>
									Wynikiem zapytania:
									<div className='pl-4'>
										<code>
											<b>SELECT</b> id_osoby, sum(punkty) <br /> <b>FROM</b>{' '}
											mandaty <br /> <b>GROUP</b> BY id_osoby
										</code>
									</div>
									jest zestawienie:
									<div className='pl-4'>
										1 21 <br /> 2 21 <br /> 3 21
									</div>
								</td>
								<td>
									<TestRadio num={2} positive />
								</td>
							</tr>
							<tr className='text-left'>
								<td>
									<b>3.</b>
								</td>
								<td>
									Wynikiem zapytania:
									<div className='pl-4'>
										<code>
											<b>SELECT</b> numer + punkty <br /> <b>FROM</b> mandaty
										</code>
									</div>
									jest
									<div className='pl-4'>86</div>
								</td>
								<td>
									<TestRadio num={3} />
								</td>
							</tr>
							<tr>
								<td>
									<b>4.</b>
								</td>
								<td className='text-left'>
									Wynikiem zapytania:
									<div className='pl-4'>
										<code>
											<b>SELECT</b> count(punkty) <br /> <b>FROM</b> mandaty
											<br /> <b>WHERE</b> punkty = 21
										</code>
									</div>
									jest
									<div className='pl-4'>1</div>
								</td>
								<td>
									<TestRadio num={4} positive />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn />
				</div>
			</TestProvider>
		</>
	);
};

export default Test;
