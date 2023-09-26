<TestProvider title="Sok">

Plik o nazwie `soki.txt` zawiera informacje o zamówieniach butelkowanego soku owocowego składanych w pewnym zakładzie przez cztery magazyny (Gniezno, Malbork, Ogrodzieniec i Przemyśl). Dane w pliku uporządkowano według kolejności zamówień. W każdym wierszu pliku znajdują się następujące dane: numer zamówienia, data zamówienia, magazyn (który składał dane zamówienie) oraz wielkość zamówienia (liczba butelek soku). Zakład przyjmuje zamówienia codziennie. Z każdego magazynu spływa maksymalnie jedno zamówienie dziennie. Pierwszy wiersz pliku jest wierszem nagłówkowym, a dane w wierszach rozdzielono znakami tabulacji.

\
**Przykład:**

```
nr_zamowienia  data        magazyn       wielkosc_zamowienia
1              02.01.2021  Ogrodzieniec  1290
2              02.01.2021  Przemysl      4420
3              02.01.2021  Gniezno       5190
4              03.01.2021  Malbork       950
5              03.01.2021  Gniezno       6000
```

  <DownloadBtn urls="/formula-2015/2022/maj/soki.txt" />
</TestProvider>

<TestProvider pkt=1>

Podaj, ile razy składano zamówienia z każdego z magazynów.

|      Magazyn |      Ilość zamówień      |
| -----------: | :----------------------: |
|      Gniezno | <TestInput answer=152 /> |
|      Malbork | <TestInput answer=183 /> |
| Ogrodzieniec | <TestInput answer=222 /> |
|     Przemysl | <TestInput answer=198 /> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=2>

Podaj liczbę dni najdłuższego okresu, kiedy zamówienia z Ogrodzieńca wpływały do zakładu codziennie, oraz datę pierwszego dnia i ostatniego dnia tego okresu.

|                       |                                                              |
| :-------------------- | ------------------------------------------------------------ |
| Liczba dni:           | <TestInput answer=8 />                                       |
| Data pierwszego dnia: | <TestInput answer="07.10.2021" placeholder="(dd.mm.rrrr)" /> |
| Data ostatniego dnia: | <TestInput answer="14.10.2021" placeholder="(dd.mm.rrrr)" /> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=3>

Wykonaj zestawienie zawierające łączną wielkość zamówień (czyli łączną liczbę zamówionych butelek soku) z każdego z magazynów. Na podstawie wykonanego zestawienia utwórz procentowy wykres kołowy ilustrujący łączną wielkość zamówień z każdego z magazynów. Pamiętaj o czytelnym opisie wykresu: o tytule, legendzie i wartościach procentowych.

|      Magazyn |   Łączna wielkość zamówień   |
| -----------: | :--------------------------: |
|      Gniezno | <TestInput answer=819000 />  |
|      Malbork | <TestInput answer=944240 />  |
| Ogrodzieniec | <TestInput answer=1115560 /> |
|     Przemysl | <TestInput answer=1062920 /> |

  <AnswerBtn />
</TestProvider>

<InfoBox taskNums="5.4 5.5">

- Sok był produkowany w zakładzie głównym i jego filii.
- Każdego dnia roboczego (od poniedziałku do piątku) w zakładzie głównym wytwarzano 12 000 butelek soku, natomiast w soboty i w niedziele – po 5 000 butelek soku.
- Każdego dnia, po zakończeniu dziennej produkcji, zakład wysyłał do magazynów butelki soku zgodnie z zamówieniem z danego dnia (to oznacza, że każde zamówienie było realizowane w tym samym dniu, w którym było złożone przez magazyn).
- Zamówienia były wysyłane w takiej kolejności, w jakiej zostały złożone przez magazyny (czyli zgodnie z ich numeracją zapisaną w pliku soki.txt).
- Każde zamówienie realizowano zawsze w całości. Gdy do wykonania całości danego zamówienia w zakładzie głównym zabrakło butelek soku, to realizacja całości tego zamówienia przekazywana była do filii (na potrzeby zadania zakładamy, że w filii nigdy nie zabraknie soku).

\
**Przykład:**

```
nr_zamowienia  data        magazyn       wielkosc_zamowienia
1              02.01.2021  Ogrodzieniec  8000
2              02.01.2021  Przemysl      5000
3              02.01.2021  Gniezno       3000
```

\
Dla powyższych przykładowych danych gdyby w zakładzie głównym, przed rozpoczęciem realizacji zamówień 1–3, było 12 000 butelek soku, to zamówienia 1 i 3 byłyby zrealizowane przez zakład główny, natomiast zamówienie 2 – przez filię zakładu.

- Przyjmujemy, że w dniu 2.01.2021 rano (przed produkcją) w zakładzie głównym znajdowało się 30 000 butelek soku.

</InfoBox>

<TestProvider pkt=4>

Podaj **datę** oraz **numer zamówienia**, które jako pierwsze zostało zrealizowane przez filię głównego zakładu. Podaj, **ile zamówień** w ciągu całego roku zostało przekazanych do filii i **ile butelek łącznie** przekazał do magazynów zakład filialny.

\
**Uwaga**: Dla danych z zadania po realizacji zamówienia nr 20 w zakładzie głównym pozostało 9 680 butelek soku.

|                        |                                                              |
| :--------------------- | ------------------------------------------------------------ |
| Data:                  | <TestInput answer="19.03.2021" placeholder="(dd.mm.rrrr)" /> |
| Numer zamówienia:      | <TestInput answer=154 />                                     |
| Liczba zamówień:       | <TestInput answer=37 />                                      |
| Łączna liczba butelek: | <TestInput answer=285230 />                                  |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=2>

Podaj, ile **najmniej** butelek (liczba całkowita) powinien wyprodukować **w dni robocze** zakład główny (przy niezmienionej produkcji w soboty i w niedziele), przy podanych zamówieniach, aby zrealizować wszystkie zamówienia samodzielnie.

|           Ilość            |
| :------------------------: |
| <TestInput answer=13179 /> |

  <AnswerBtn />
</TestProvider>
