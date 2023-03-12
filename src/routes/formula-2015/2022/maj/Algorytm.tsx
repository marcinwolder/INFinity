import PythonCompilerText from '../../../../components/PythonCompiler/PythonCompilerText';
import {
	AnswerBtn,
	TestInput,
	TestProvider,
	TestPythonText,
} from '../../../../context/testContext';
import Tab from '../../../../components/Tab';
import Def from '../../../../components/Def';

const Algorytm = () => {
	return (
		<>
			<TestProvider taskNum={1} title='n-permutacja'>
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
				<br /> w ciągu (1,3,1) wystarczy podmienić jeden element - pierwszą lub
				ostatnią jedynkę (1) - na dwójkę (2), aby powstały ciąg był
				3-permutacją.
			</TestProvider>
			<TestProvider taskNum={1.1} pkt={2}>
				Uzupełnij poniższą tabelę - dla każdego z podanych ciągów podaj
				najmniejszą liczbę elementów, które trzeba podmienić, aby dany ciąg był
				n-permutacją. Jeśli ciąg jest już n-permutacją, wpisz 0.
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
					</table>
				</div>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={1.2} pkt={4}>
				Zapisz w pseudojęzyku lub wybranym języku programowania algorytm, który
				dla danego ciągu n dodatnich liczb całkowitych zapisanego w tablicy A
				obliczy najmniejszą liczbę elementów, które trzeba w nim podmienić, aby
				otrzymać n-permutację. <br />
				<br /> <b>Uwaga:</b> W zapisie algorytmu możesz korzystać tylko z
				instrukcji sterujących, operatorów arytmetycznych: dodawania,
				odejmowania, mnożenia, dzielenia, dzielenia całkowitego i reszty z
				dzielenia; operatorów logicznych, porównań, odwoływania się do
				pojedynczych elementów tablicy i instrukcji przypisania lub samodzielnie
				napisanych funkcji i procedur wykorzystujących powyższe operacje.
				<b> Zabronione</b> jest używanie funkcji wbudowanych oraz operatorów
				innych niż wymienione, dostępnych w językach programowania.
				<br />
				<br /> <b>Specyfikacja:</b>
				<Tab>
					Dane:
					<Tab>
						<Def name='n'>dodatnia liczba całkowita</Def>
						<Def name='A[1..n]'>
							tablica n dodatnich liczb całkowitych, gdzie <code>A[i]</code>{' '}
							jest i-tym elementem ciągu
						</Def>
					</Tab>
					Wynik:
					<Tab>
						<Def name='k'>
							minimalna liczba elementów, które trzeba podmienić w ciągu
							zapisanym w tablicy <code>A</code>, aby otrzymać n-permutację
						</Def>
					</Tab>
				</Tab>
				<TestPythonText answer={'4\n6\n5\n'} num={1}>
					{
						'def func(n, A):\n\treturn(n)\n\nprint(func(4, [1, 4, 2, 5]))\nprint(func(6, [5, 4, 1, 5, 6, 8]))\nprint(func(5, [2, 2, 2, 2, 2]))'
					}
				</TestPythonText>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Algorytm;
