import {
	AnswerBtn,
	TestProvider,
	TestRadio,
	TestInput,
} from '../../../../context/testContext';
import Tab from '../../../../components/Tab';
import Table from '../../../../components/Table';
const Analiza = () => {
	return (
		<>
			<TestProvider taskNum={2} title='ab-słowo'>
				Niech n będzie dodatnią liczbą całkowitą i niech s będzie słowem o
				długości <code>n</code> zbudowanym z liter a lub b. Zapis{' '}
				<code>s[i]</code> oznacza i-tą literę w tym słowie (1 ≤ i ≤ n). Dla
				słowa <code>s</code> wykonujemy poniższy algorytm. Wynikiem działania
				algorytmu jest wartość zmiennej k.
				<br />
				<br />
				<b>Algorytm</b>
				<br />
				<br />
				<code>
					A[0] ← 0 <br />
					<b>dla</b> i = 1, 2, ..., n <br />
					<Tab>
						<b>jeżeli</b> s[i] = 'a' <br />
						<Tab>
							A[i] ← A[i - 1] + 1 <br />
						</Tab>
						<b>w przeciwnym razie</b> <br />
						<Tab>
							A[i] ← A[i - 1] <br />
						</Tab>
					</Tab>
					<br />
					B[n + 1] ← 0 <br />
					<b>dla</b> j = n, n - 1, ..., 1<br />
					<Tab>
						<b>jeżeli</b> s[j] = 'b' <br />
						<Tab>
							B[j] ← B[j + 1] + 1 <br />
						</Tab>
						<b>w przeciwnym razie</b> <br />
						<Tab>
							B[j] ← B[j + 1] <br />
						</Tab>
					</Tab>
					<br />
					k ← 1 <br />
					<b>dla</b> i = 0, 1, 2, ..., n<br />
					<Tab>
						<b>jeżeli</b> A[i] + B[i + 1] &gt; k <br />
						<Tab>k ← A[i] + B[i + 1]</Tab>
					</Tab>
					<br />
				</code>
			</TestProvider>
			<TestProvider taskNum={2.1} pkt={2}>
				Uzupełnij tabelę - wpisz wynik działania algorytmu dla podanych wartości
				s.
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
				Podaj przykłady dziesięcioliterowych słów złożonych z liter a lub b, dla
				których wynik działania powyższego algorytmu (wartość k) jest równy
				odpowiednio 10 i 5.
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
				Dla uproszczenia będziemy pisać a<sup>2</sup> zamiast aa, a<sup>3</sup>{' '}
				zamiast aaa i tak dalej. Innymi słowy: dla dowolnej dodatniej liczby
				całkowitej m, zapis a m oznacza literę a powtórzoną m razy, natomiast b
				m oznacza literę b powtórzoną m razy. Podaj wynik działania (wartość k)
				powyższego algorytmu dla słowa a<sup>300</sup> b<sup>550</sup> a
				<sup>300</sup> b<sup>7</sup> a<sup>280</sup> b<sup>110</sup>.
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
