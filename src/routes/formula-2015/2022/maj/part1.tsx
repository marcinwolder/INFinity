import React from 'react';
import Task from '../../../../components/Task';
import PythonCompiler from '../../../../components/PythonCompiler';

const Part1 = () => {
	return (
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
				<br /> w ciągu (1,3,1) wystarczy podmienić jeden element - pierwszą lub
				ostatnią jedynkę (1) - na dwójkę (2), aby powstały ciąg był
				3-permutacją.
			</Task>
			<Task title='1.1' show pkt={2}>
				Uzupełnij poniższą tabelę - dla każdego z podanych ciągów podaj
				najmniejszą liczbę elementów, które trzeba podmienić, aby dany ciąg był
				n-permutacją. Jeśli ciąg jest już n-permutacją, wpisz 0.
			</Task>
			<Task title='1.2' show pkt={4}>
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
					<PythonCompiler dataPath='liczby.txt' setResult={() => {}} />
				</div>
			</Task>
		</div>
	);
};

export default Part1;
