<TestProvider title="System kontroli dostępu">

W plikach `klasa.txt`, `uczen.txt` i `ewidencja.txt` zapisano dane pochodzące
z automatycznego systemu kontroli wejść i wyjść w pewnej szkole, z 5 dni (od 4 do 8
kwietnia 2022 r.). Uczniowie posiadają imienne identyfikatory, które umożliwiają rejestrację
wejścia do szkoły i wyjścia ze szkoły.
Pierwszy wiersz w każdym z plików jest wierszem nagłówkowym. Dane w każdym wierszu
oddzielono średnikiem.

\
**Uwaga**: Jeżeli uczeń jest obecny, to danego dnia wchodzi do szkoły jeden raz i jeden raz
z niej wychodzi.

\
W pliku `klasa.txt` zapisano informacje o klasach. Każdy wiersz zawiera:  
`IdKlasy` – identyfikator klasy  
`ProfilKlasy` – profil kształcenia klasy

\
**Przykład**

```
IdKlasy;ProfilKlasy
1a;biologiczno-chemiczny
1b;humanistyczny
```

\
W pliku `uczen.txt` zapisano informacje o uczniach tej szkoły. Każdy wiersz zawiera:  
`IdUcznia` – identyfikator ucznia  
`Imie` – imię ucznia  
`Nazwisko` – nazwisko ucznia  
`IdKlasy` – identyfikator klasy

\
**Przykład**

```
IdUcznia;Imie;Nazwisko;IdKlasy
1;Mariusz;Koprowski;3e
2;Maciej;Machol;3a
```

\
W pliku `ewidencja.txt` zapisano informacje o wejściach i wyjściach ze szkoły. Każdy
wiersz zawiera:  
`IdEwidencji` – identyfikator wpisu dotyczącego wejścia i wyjścia ze szkoły  
`IdUcznia` – identyfikator ucznia  
`Wejscie` – datę i godzinę zarejestrowanego wejścia do szkoły (w formacie rrrr-mm-dd gg:mm:ss)  
`Wyjscie` – datę i godzinę zarejestrowanego wyjścia ze szkoły (w formacie rrrr-mm-dd gg:mm:ss)

\
**Przykład**

```
IdEwidencji;IdUcznia;Wejscie;Wyjscie
1;18;2022-04-04 07:02:00;2022-04-04 14:11:00
2;94;2022-04-04 07:07:00;2022-04-04 14:14:00
3;121;2022-04-04 07:07:00;2022-04-04 14:14:00
4;88;2022-04-04 07:10:00;2022-04-04 14:12:00
```

\
Wykorzystaj dostępne narzędzia informatyczne i podaj odpowiedzi do zadań 6.1.–6.4.

  <DownloadBtn urls="klasa.txt uczen.txt ewidencja.txt"/>
</TestProvider>

<TestProvider pkt=2 videoAnswerUrl=".">

Oblicz i podaj, ile wszystkich <u>wejść</u> dziewcząt z klas o profilu biologiczno-chemicznym
(„biologiczno-chemiczny”) do szkoły zarejestrował system kontroli dostępu w analizowanym
okresie 5 dni. Wszystkie imiona dziewcząt (i tylko dziewcząt) w tej szkole kończą się literą _a_.

|          Ilość           |
| :----------------------: |
| <TestInput answer=165 /> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=3>

Utwórz zestawienie zawierające informację o liczbie uczniów, którzy <u>w poszczególnych dniach</u>
analizowanego okresu <u>nie spóźnili</u> się do szkoły. Jako godzinę rozpoczęcia zajęć
przyjmujemy godzinę 8<sup>00</sup>. Wejście ucznia zarejestrowane po 8<sup>00</sup>
traktujemy jako spóźnienie.

|       Data |      Liczba uczniów      |
| ---------: | :----------------------: |
| 04.04.2022 | <TestInput answer=233 /> |
| 05.04.2022 | <TestInput answer=303 /> |
| 06.04.2022 | <TestInput answer=134 /> |
| 07.04.2022 | <TestInput answer=280 /> |
| 08.04.2022 | <TestInput answer=127 /> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=3>

Dla każdej osoby zliczamy <u>łączny czas</u> pobytu w szkole w analizowanym okresie 5 dni.
Podaj `identyfikatory` oraz `imiona` i `nazwiska` trzech osób, które w ciągu monitorowanego
czasu przebywały najdłużej na terenie szkoły.

|                                    Identyfikator, Imię, Nazwisko                                     |
| :--------------------------------------------------------------------------------------------------: |
| <TestArea passIfNotSorted answer="314\tSebastian\tRabaj\n172\tMonika\tKado\n299\tAlicja\tKronecka"/> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=3>

Podaj imiona i nazwiska wszystkich uczniów, którzy byli nieobecni 6.04.2022 r.

|                                       Imię, Nazwisko                                        |
| :-----------------------------------------------------------------------------------------: |
| <TestArea answer="Mateusz\tKordas\nKrzysztof\tMichalak\nOliwier\tZiolko" passIfNotSorted /> |

  <AnswerBtn />
</TestProvider>
