<TestProvider title="n-permutacja">

Dla dodatniej liczby całkowitej _n_, **_n-permutacją_** nazywamy taki _n_-elementowy ciąg liczb całkowitych, który zawiera każdą z liczb 1, 2, …, _n_ dokładnie jeden raz.

\
**Przykład**:  
ciąg (4,2,1,3) jest _4-permutacją_,  
ciąg (6,5,4,1,2,3) jest _6-permutacją_,  
ciągi (1,3,1,2) i (2,3,4,5) nie są _4-permutacjami_.

\
W ciągu _n_ liczb całkowitych, który nie jest _n-permutacją_, można podmienić niektóre elementy tak, aby otrzymać _n-permutację_.

\
**Przykład**:  
w ciągu (1,3,1) wystarczy podmienić jeden element – pierwszą lub ostatnią jedynkę (1) – na dwójkę (2), aby powstały ciąg był _3-permutacją_.

</TestProvider>
<TestProvider pkt=2>

Uzupełnij poniższą tabelę – dla każdego z podanych ciągów podaj najmniejszą liczbę elementów, które trzeba podmienić, aby dany ciąg był _n-permutacją_. Jeśli ciąg jest już _n-permutacją_, wpisz 0.

| n   |        ciąg        | liczba elementów do podmiany |
| :-- | :----------------: | :--------------------------: |
| 3   |     (1, 3, 1)      |              1               |
| 4   |    (1, 4, 2, 5)    |    <TestInput answer=1 />    |
| 5   |  (2, 2, 2, 2, 2)   |    <TestInput answer=4 />    |
| 4   |    (4, 2, 3, 1)    |    <TestInput answer=0 />    |
| 6   | (5, 4, 1, 5, 6, 8) |    <TestInput answer=2 />    |
| 6   | (8, 4, 9, 6, 5, 7) |    <TestInput answer=3 />    |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=4>

Zapisz w pseudojęzyku lub wybranym języku programowania algorytm, który dla danego ciągu n dodatnich liczb całkowitych zapisanego w tablicy A obliczy najmniejszą liczbę elementów, które trzeba w nim podmienić, aby otrzymać n-permutację.

\
**Uwaga**: W zapisie algorytmu możesz korzystać tylko z instrukcji sterujących, operatorów arytmetycznych: dodawania, odejmowania, mnożenia, dzielenia, dzielenia całkowitego i reszty z dzielenia; operatorów logicznych, porównań, odwoływania się do pojedynczych elementów tablicy i instrukcji przypisania lub samodzielnie napisanych funkcji i procedur wykorzystujących powyższe operacje. Zabronione jest używanie funkcji wbudowanych oraz operatorów innych niż wymienione, dostępnych w językach programowania.

\
**Specyfikacja**:

> Dane:

> > n – dodatnia liczba całkowita  
> > A[1..n] – tablica n dodatnich liczb całkowitych, gdzie A[i] jest i-tym elementem ciągu

> Wynik:

> > k – minimalna liczba elementów, które trzeba podmienić w ciągu zapisanym w tablicy A, aby otrzymać n-permutację

\
**Algorytm**:

  <TestPython/>

  <AnswerBtn />
</TestProvider>
