import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import Tab from '../../../../components/Tab';
import {
	TestInput,
	TestProvider,
	AnswerBtn,
	TestRadio,
} from '../../../../components/testComps';
import { answearSlice } from '../../../../redux/slices/answers';
import { Formula, usePathElements } from '../../../../redux/slices/path';

const Test = () => {
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [show3, setShow3] = useState(false);
	const dispatch = useDispatch();
	const { changeAns } = answearSlice.actions;

	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	return (
		<>
			<TestProvider taskNum={3} title='Test'>
				<TestInput num={1} answer='20' />
				<TestInput num={2} answer='2020' />
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={3.1} pkt={2}>
				<TestInput num={1} answer='40' />
				<TestRadio num={2} positive>
					Hello
				</TestRadio>
				<TestRadio num={3} />
				<AnswerBtn />
			</TestProvider>
			{/* <Task title='3. Test'>
				Oceń prawdziwość podanych zdań. Zaznacz <b>P</b>, jeśli zdanie jest
				prawdziwe, albo <b>F</b> - jeśli jest fałszywe. W każdym zadaniu punkt
				uzyskasz tylko za komplet poprawnych odpowiedzi.
			</Task>
			<Task title='3.1' show pkt={1}>
				<br />
				Dany jest algorytm: <br />
				<code>
					s ← 0
					<Tab>
						<b>dla</b> i = 1, 2, …, n
						<Tab>
							<b>dla</b> j = i, i + 1, …, n<Tab>s ← s + 1</Tab>
						</Tab>
					</Tab>
				</code>
				<br /> Złożoność obliczeniowa powyższego algorytmu oceniona liczbą
				wykonań instrukcji s ← s + 1, w zależności od dodatniej liczby
				całkowitej n, jest
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden'>
						<tbody>
							<tr>
								<td>
									<b>1.</b>
								</td>
								<td className='text-left'>liniowa.</td>
								<td><TestRadio show={show1} /></td>
							</tr>
							<tr>
								<td>
									<b>2.</b>
								</td>
								<td className='text-left'>kwadratowa.</td>
								<td><TestRadio show={show1} positive /></td>
							</tr>
							<tr>
								<td>
									<b>3.</b>
								</td>
								<td className='text-left'>n log n.</td>
								<td><TestRadio show={show1} /></td>
							</tr>
							<tr>
								<td>
									<b>4.</b>
								</td>
								<td className='text-left'>nie większa niż sześcienna.</td>
								<td><TestRadio show={show1} positive /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn show={show1} setShow={setShow1} />
				</div>
			</Task>
			<Task title='3.2' show pkt={1}>
				Po dodaniu liczb 132<sub>4</sub> oraz 3111<sub>4</sub> zapisanych w
				systemie czwórkowym otrzymamy:
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden'>
						<tbody>
							<tr>
								<td>
									<b>1.</b>
								</td>
								<td className='text-left'>
									1111011<sub>2</sub>
								</td>
								<td><TestRadio show={show2} positive /></td>
							</tr>
							<tr>
								<td>
									<b>2.</b>
								</td>
								<td className='text-left'>
									362<sub>8</sub>
								</td>
								<td><TestRadio show={show2} positive /></td>
							</tr>
							<tr>
								<td>
									<b>3.</b>
								</td>
								<td className='text-left'>
									F3<sub>16</sub>
								</td>
								<td><TestRadio show={show2} /></td>
							</tr>
							<tr>
								<td>
									<b>4.</b>
								</td>
								<td className='text-left'>
									3303<sub>4</sub>
								</td>
								<td><TestRadio show={show2} /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn show={show2} setShow={setShow2} />
				</div>
			</Task>
			<Task title='3.3' show pkt={1}>
				W bazie danych istnieje tabela mandaty(numer, id_osoby, punkty)
				zawierająca następujące dane:
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden'>
						<thead>
							<tr>
								<th>numer</th>
								<th>id_osoby</th>
								<th>punkty</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>1</td>
								<td>5</td>
							</tr>
							<tr>
								<td>2</td>
								<td>1</td>
								<td>14</td>
							</tr>
							<tr>
								<td>3</td>
								<td>2</td>
								<td>20</td>
							</tr>
							<tr>
								<td>4</td>
								<td>3</td>
								<td>21</td>
							</tr>
							<tr>
								<td>5</td>
								<td>2</td>
								<td>1</td>
							</tr>
							<tr>
								<td>6</td>
								<td>1</td>
								<td>2</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
					<table className='table table-compact w-full text-center overflow-hidden'>
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
								<td><TestRadio show={show3} /></td>
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
								<td><TestRadio show={show3} positive /></td>
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
								<td><TestRadio show={show3} /></td>
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
								<td><TestRadio show={show3} positive /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='w-full flex justify-center pt-2'>
					<AnswerBtn show={show3} setShow={setShow3} />
				</div>
			</Task> */}
		</>
	);
};

export default Test;
