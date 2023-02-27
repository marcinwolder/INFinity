import React, { useState, useRef } from 'react';
import Task from '../../../../components/Task';
import PythonCompiler from '../../../../components/PythonCompiler';
import { AnswerBtn, TestInput } from '../../../../components/Test';

const Part1 = () => {
	const [show, setShow] = useState(false);
	return (
		<>
			<div className='mb-2 tabs bg-base-100 tabs-boxed justify-center'>
				<a className='tab tab-active'>Algorytm</a>
				<a className='tab'>Analiza</a>
				<a className='tab'>Test</a>
			</div>
			<div>
				<Task title='1. n-permutacja'>
					Dla dodatniej liczby całkowitej n, n-permutacją nazywamy taki
					n-elementowy ciąg liczb całkowitych, który zawiera każdą z liczb 1, 2,
					…, n dokładnie jeden raz. <br />
					<br /> <b>Przykład:</b> <br /> ciąg (4,2,1,3) jest 4-permutacją,
					<br /> ciąg (6,5,4,1,2,3) jest 6-permutacją,
					<br /> ciągi (1,3,1,2) i (2,3,4,5) nie są 4-permutacjami
					<br />
					<br /> W ciągu n liczb całkowitych, który nie jest n-permutacją, można
					podmienić niektóre elementy tak, aby otrzymać n-permutację.
					<br />
					<br /> <b>Przykład:</b>
					<br /> w ciągu (1,3,1) wystarczy podmienić jeden element - pierwszą
					lub ostatnią jedynkę (1) - na dwójkę (2), aby powstały ciąg był
					3-permutacją.
				</Task>
				<Task title='1.1' show pkt={2}>
					Uzupełnij poniższą tabelę - dla każdego z podanych ciągów podaj
					najmniejszą liczbę elementów, które trzeba podmienić, aby dany ciąg
					był n-permutacją. Jeśli ciąg jest już n-permutacją, wpisz 0.
					<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
						<table className='table table-compact w-full text-center'>
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
										<TestInput show={show} answer='1' />
									</td>
								</tr>
								<tr>
									<td>5</td>
									<td>(2, 2, 2, 2, 2)</td>
									<td>
										<TestInput show={show} answer='4' />
									</td>
								</tr>
								<tr>
									<td>4</td>
									<td>(4, 3, 2, 1)</td>
									<td>
										<TestInput show={show} answer='0' />
									</td>
								</tr>
								<tr>
									<td>6</td>
									<td>(5, 4, 1, 5, 6, 8)</td>
									<td>
										<TestInput show={show} answer='2' />
									</td>
								</tr>
								<tr>
									<td>6</td>
									<td>(8, 4, 9, 6, 5, 7)</td>
									<td>
										<TestInput show={show} answer='3' />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className='w-full flex justify-center pt-2'>
						<AnswerBtn setShow={setShow} show={show} />
					</div>
				</Task>
				{/* //TODO: input na odpowiedź / sprawdzanie na global event */}
				<Task title='1.2' show pkt={4}>
					Zapisz w pseudojęzyku lub wybranym języku programowania algorytm,
					który dla danego ciągu n dodatnich liczb całkowitych zapisanego w
					tablicy A obliczy najmniejszą liczbę elementów, które trzeba w nim
					podmienić, aby otrzymać n-permutację. <br />
					<br /> <b>Uwaga:</b> W zapisie algorytmu możesz korzystać tylko z
					instrukcji sterujących, operatorów arytmetycznych: dodawania,
					odejmowania, mnożenia, dzielenia, dzielenia całkowitego i reszty z
					dzielenia; operatorów logicznych, porównań, odwoływania się do
					pojedynczych elementów tablicy i instrukcji przypisania lub
					samodzielnie napisanych funkcji i procedur wykorzystujących powyższe
					operacje.
					<b> Zabronione</b> jest używanie funkcji wbudowanych oraz operatorów
					innych niż wymienione, dostępnych w językach programowania.
					<br />
					<br /> <b>Specyfikacja:</b>
					<div className='pl-4'>
						Dane:
						<div className='pl-4'>
							<div className='flex gap-1'>
								<i>n</i>
								<div>- dodatnia liczba całkowita</div>
							</div>
							<div className='flex gap-1'>
								<i>A[1..n]</i>
								<div>
									- tablica n dodatnich liczb całkowitych, gdzie A[i] jest i-tym
									elementem ciągu
								</div>
							</div>
						</div>
						Wynik:
						<div className='pl-4'>
							<div className='flex gap-1'>
								<i>k</i>
								<div>
									- minimalna liczba elementów, które trzeba podmienić w ciągu
									zapisanym w tablicy A, aby otrzymać n-permutację
								</div>
							</div>
						</div>
					</div>
					<div className='pt-4'>
						<PythonCompiler
							dataPath='formula-2015/2022/maj/liczby.txt'
							setResult={() => {}}
						/>
					</div>
				</Task>
				{/* //TODO: sprawdzenie danych z state(terminal) - gdy błędna, możliwość sprawdzenia manualnego? */}
			</div>
		</>
	);
};

export default Part1;
