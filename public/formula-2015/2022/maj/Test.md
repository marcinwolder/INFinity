<TestProvider title="Test">

Oceń prawdziwość podanych zdań. Zaznacz **P**, jeśli zdanie jest prawdziwe, albo **F** – jeśli jest fałszywe.  
W każdym zadaniu punkt uzyskasz tylko za komplet poprawnych odpowiedzi.

</TestProvider>

<TestProvider pkt=1>

Dany jest algorytm:

```
s ← 0
dla i = 1, 2, …, n
  dla j = i, i + 1, …, n
  s ← s + 1
```

\
Złożoność obliczeniowa powyższego algorytmu oceniona liczbą wykonań instrukcji `s ← s + 1`, w zależności od dodatniej liczby całkowitej `n`, jest

|                               |                        |
| :---------------------------- | ---------------------- |
| 1. linowa                     | <TestRadio />          |
| 2. kwadratowa                 | <TestRadio positive /> |
| 3. n log n                    | <TestRadio />          |
| 4. nie większa niż sześcienna | <TestRadio positive /> |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=1>

Po dodaniu liczb 132<sub>4</sub> oraz 3111<sub>4</sub> zapisanych w systemie czwórkowym otrzymamy:

|                        |                        |
| :--------------------- | ---------------------- |
| 1. 1111011<sub>2</sub> | <TestRadio />          |
| 2. 362<sub>8</sub>     | <TestRadio />          |
| 3. F3<sub>16</sub>     | <TestRadio positive /> |
| 4. 3303<sub>4</sub>    | <TestRadio positive /> |

  <AnswerBtn />
</TestProvider>
<TestProvider pkt=1>

W bazie danych istnieje tabela _mandaty(numer, id_osoby, punkty)_ zawierająca następujące dane:

| numer | id_osoby | punkty |
| :---: | :------: | :----: |
|   1   |    1     |   5    |
|   2   |    1     |   14   |
|   3   |    2     |   20   |
|   4   |    3     |   21   |
|   5   |    2     |   1    |
|   6   |    1     |   2    |

\
Zapytanie nr. 1:

```sql
SELECT id_osoby, sum(punkty)
FROM mandaty
GROUP BY id_osoby
HAVING sum(punkty) > 5

```

Zapytanie nr. 2:

```sql
SELECT id_osoby, sum(punkty)
FROM mandaty
GROUP BY id_osoby

```

Zapytanie nr. 3:

```sql
SELECT numer + punkty
FROM mandaty

```

Zapytanie nr. 4:

```sql
SELECT count(punkty)
FROM mandaty
WHERE punkty = 21

```

|     |                                                                                  |                        |
| --- | -------------------------------------------------------------------------------- | ---------------------- |
| 1.  | Wynikiem **zapytania nr. 1** jest zestawienie: <div>1 14</br>2 20</br>3 21</div> | <TestRadio />          |
| 2.  | Wynikiem **zapytania nr. 2** jest zestawienie: <div>1 21</br>2 21</br>3 21</div> | <TestRadio positive /> |
| 3.  | Wynikiem **zapytania nr. 3** jest: <div>81</div>                                 | <TestRadio />          |
| 4.  | Wynikiem **zapytania nr. 4** jest: <div>1</div>                                  | <TestRadio positive /> |

  <AnswerBtn />
</TestProvider>
