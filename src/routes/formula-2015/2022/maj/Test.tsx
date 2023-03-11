import Tab from '../../../../components/Tab';
import {
	AnswerBtn,
	TestRadio,
	TestProvider,
} from '../../../../components/testComps';
import { usePathElements } from '../../../../redux/slices/path';

const Test = () => {
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	return (
		<>
			<TestProvider taskNum={3} title='Test'>
				Oceń prawdziwość podanych zdań. Zaznacz <b>P</b>, jeśli zdanie jest
				prawdziwe, albo <b>F</b> - jeśli jest fałszywe. W każdym zadaniu punkt
				uzyskasz tylko za komplet poprawnych odpowiedzi.
			</TestProvider>
			<TestProvider taskNum={3.1} pkt={1}>
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
								<td>
									<TestRadio num={1} />
								</td>
							</tr>
							<tr>
								<td>
									<b>2.</b>
								</td>
								<td className='text-left'>kwadratowa.</td>
								<td>
									<TestRadio num={2} positive />
								</td>
							</tr>
							<tr>
								<td>
									<b>3.</b>
								</td>
								<td className='text-left'>n log n.</td>
								<td>
									<TestRadio num={3} />
								</td>
							</tr>
							<tr>
								<td>
									<b>4.</b>
								</td>
								<td className='text-left'>nie większa niż sześcienna.</td>
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
			<TestProvider taskNum={3.2} pkt={1}>
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
