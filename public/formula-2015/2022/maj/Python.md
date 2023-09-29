<TestProvider title="Liczby">

W pliku `liczby.txt` danych jest 200 różnych liczb całkowitych z zakresu [10, 100000]. Każda z tych liczb zapisana jest w osobnym wierszu.

\
**Napisz program** (lub kilka programów), który(-e) znajdzie(-dą) odpowiedzi do poniższych zadań.

\
Do dyspozycji masz plik `przyklad.txt`, który także zawiera 200 liczb – odpowiedzi dla tego pliku podano w treściach zadań. Możesz sprawdzać na nim działanie swojego programu.

\
**Uwaga**: Pamiętaj, że Twój program musi ostatecznie działać dla pliku `liczby.txt`.

<DownloadBtn urls="liczby.txt przyklad.txt">

</TestProvider>
<TestProvider pkt=4 showOnDefault>

Podaj, ile jest w pliku `liczby.txt` takich liczb, których cyfry pierwsza i ostatnia są takie same. Zapisz tę z nich, która występuje w pliku `liczby.txt` jako pierwsza. W pliku z danymi jest co najmniej jedna taka liczba.

\
Odpowiedź dla danych z pliku `przyklad.txt`: 26 626  
(26 takich liczb, które mają pierwszą i ostatnią cyfrę taką samą; pierwszą z nich w pliku przykładowym jest 626)

|                  |                           |
| ---------------: | ------------------------- |
|     Ilość liczb: | <TestInput answer=18/>    |
| Pierwsza z nich: | <TestInput answer=93639/> |

  <AnswerBtn/>
</TestProvider>

<TestProvider pkt=4 showOnDefault>

Znajdź w pliku `liczby.txt`:

- liczbę, która ma w rozkładzie najwięcej czynników pierwszych (podaj tę liczbę oraz liczbę jej czynników pierwszych)
- liczbę, która ma w rozkładzie najwięcej <u>różnych</u> czynników pierwszych (podaj tę liczbę oraz liczbę jej <u>różnych</u> czynników pierwszych).

\
**Przykład**: liczba 420=2·2·3·5·7 ma w rozkładzie 5 czynników pierwszych, w tym 4 różne czynniki pierwsze (2, 3, 5, 7).

\
Odpowiedź dla danych z pliku `przyklad.txt`:  
144 6 210 4 (Liczba 144 ma najwięcej czynników pierwszych; liczba czynników pierwszych liczby 144 wynosi 6. Liczba 210 ma najwięcej <u>różnych</u> czynników pierwszych; liczba <u>różnych</u> czynników pierwszych liczby 210 wynosi 4).

|                                       |                                                         |
| ------------------------------------: | ------------------------------------------------------- |
|         Liczba - najwięcej czynników: | <TestInput mode="array" answer="99792\t20992\t56064" /> |
|                      Ilość czynników: | <TestInput answer="10" />                               |
| Liczba - najwięcej różnych czynników: | <TestInput answer="62790" />                            |
|              Ilość różnych czynników: | <TestInput answer="6" />                                |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=4 showOnDefault>

Trójka (_x_, _y_, _z_) jest _dobra_, jeśli _y_ jest wielokrotnością _x_, natomiast _z_ jest wielokrotnością _y_ (czyli _x_ dzieli _y_, a _y_ dzieli _z_) oraz _x_, _y_, _z_ są różne.

\
**Przykład**: trójka (2, 6, 12) jest dobra, ponieważ 2 dzieli 6, a 6 dzieli 12. Trójka (2, 10, 12) nie jest dobra, ponieważ 10 nie dzieli 12. Analogicznie możemy zdefiniować dobrą piątkę liczb – piątka (_u_, _w_, _x_, _y_, _z_) jest dobra, jeśli każda z liczb, poza pierwszą, jest podzielna przez poprzednią liczbę z piątki (_u_ dzieli _w_, _w_ dzieli _x_, _x_ dzieli _y_ oraz _y_ dzieli _z_) oraz wszystkie liczby z piątki są różne.

- Podaj, ile jest dobrych trójek wśród liczb występujących w pliku `liczby.txt`. Zapisz wszystkie dobre trójki do pliku `trojki.txt`, każdą w osobnym wierszu.

**Uwaga**: Liczby z trójki nie muszą występować w pliku `liczby.txt` w kolejnych wierszach, a ich kolejność w tym pliku może być dowolna.

- Podaj, ile jest dobrych piątek wśród liczb występujących w pliku `liczby.txt`.

\
Odpowiedzi dla danych z pliku `przyklad.txt`:

- 10
- 1 (10 dobrych trójek i jedna dobra piątka)

\
Zawartość pliku trojki.txt dla danych z pliku `przyklad.txt`:  
13 104 208  
13 52 104  
13 52 208  
13 26 104  
13 26 52  
13 26 208  
52 104 208  
26 104 208  
26 52 104  
26 52 208

| Ilość dobrych trójek  | Ilość dobrych piątek |
| :-------------------: | :------------------: |
| <TestInput answer=27> | <TestInput answer=2> |

|                                                                                                                                                                                                                                                  Dobre trójki                                                                                                                                                                                                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <TestArea passIfNotSorted answer="955 8595 42975\n232 13688 27376\n13594 27188 81564\n971 13594 81564\n971 13594 27188\n971 27188 81564\n971 6797 81564\n971 6797 13594\n971 6797 27188\n797 7173 64557\n1403 42090 84180\n1403 2806 42090\n1403 2806 84180\n1403 2806 8418\n1403 8418 42090\n1403 8418 84180\n871 15678 62712\n497 22365 89460\n2806 42090 84180\n2806 8418 42090\n2806 8418 84180\n392 20384 61152\n409 9816 58896\n8418 42090 84180\n6797 13594 81564\n6797 13594 27188\n6797 27188 81564"> |

  <AnswerBtn />

</TestProvider>
