<TestProvider title="ab-słowo">

Niech `n` będzie dodatnią liczbą całkowitą i niech `s`będzie słowem o długości `n` zbudowanym z liter _a_ lub _b_. Zapis `s[i]` oznacza `i`-tą literę w tym słowie (1 ≤ `i`≤`n`). Dla słowa `s` wykonujemy poniższy algorytm. Wynikiem działania algorytmu jest wartość zmiennej `k`.

\
**Algorytm**

```
A[0] ← 0
dla i = 1, 2, ..., n
  jeżeli s[i] = 'a'
    A[i] ← A[i – 1] + 1
  w przeciwnym razie
    A[i] ← A[i – 1]

B[n + 1] ← 0
dla j = n, n – 1, ..., 1
  jeżeli s[j] = 'b'
    B[j] ← B[j + 1] + 1
  w przeciwnym razie
    B[j] ← B[j + 1]

k ← 1
dla i = 0, 1, 2, ..., n
  jeżeli A[i] + B[i + 1] > k
    k ← A[i] + B[i + 1]
```

</TestProvider>
<TestProvider pkt=2>

Uzupełnij tabelę – wpisz wynik działania algorytmu dla podanych wartości `s`.

|  n  |     s     | Wynik działania algorytmu (wartość k) |
| :-: | :-------: | :-----------------------------------: |
|  5  |   aabab   |                   4                   |
|  2  |    ab     |                   2                   |
|  3  |    aaa    |                   3                   |
|  6  |  aababb   |        <TestInput answer=5 />         |
|  9  | baabbaaab |        <TestInput answer=6 />         |

  <AnswerBtn />
</TestProvider>
<TestProvider pkt=2>

Podaj przykłady dziesięcioliterowych słów złożonych z liter _a_ lub _b_, dla których wynik działania powyższego algorytmu (wartość _k_) jest równy odpowiednio 10 i 5.

|  n  |           s           | Wynik działania algorytmu (wartość k) |
| :-: | :-------------------: | :-----------------------------------: |
| 10  | <TestInput mode=func> |                  10                   |
| 10  | <TestInput mode=func> |                   5                   |

  <AnswerBtn />
</TestProvider>

<TestProvider pkt=2>

Dla uproszczenia będziemy pisać _a<sup>2</sup>_ zamiast _aa_, _a<sup>3</sup>_ zamiast _aaa_ i tak dalej. Innymi słowy: dla dowolnej dodatniej liczby całkowitej _m_, zapis _a<sup>m</sup>_ oznacza literę _a_ powtórzoną _m_ razy, natomiast _b<sup>m</sup>_ oznacza literę _b_ powtórzoną _m_ razy. Podaj wynik działania (wartość _k_) powyższego algorytmu dla słowa a<sup>300</sup>b<sup>550</sup>a<sup>300</sup>b<sup>7</sup>a<sup>280</sup>b<sup>110</sup>.

|            k            |
| :---------------------: |
| <TestInput answer=990/> |

  <AnswerBtn />
</TestProvider>
