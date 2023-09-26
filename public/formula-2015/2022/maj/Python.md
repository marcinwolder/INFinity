<TestProvider title="Liczby">

Podaj, ile jest w pliku `liczby.txt` takich liczb, których cyfry pierwsza i ostatnia są takie same. Zapisz tę z nich, która występuje w pliku `liczby.txt` jako pierwsza. W pliku z danymi jest co najmniej jedna taka liczba.

\
Odpowiedź dla danych z pliku `przyklad.txt`: 26 626  
(26 takich liczb, które mają pierwszą i ostatnią cyfrę taką samą; pierwszą z nich w pliku przykładowym jest 626)

</TestProvider>
<TestProvider pkt=4 showOnDefault>

<TestPython
    terminal
    tests="18 93639"
    parameters="ilość liczb, pierwsza z nich"
    path="formula-2015/2022/maj/liczby.txt"
    testPath="formula-2015/2022/maj/przyklad.txt"
  />

</TestProvider>

<TestProvider pkt=4 showOnDefault>

<TestPython
  terminal
  parameters=
  "Liczba - najwięcej czynników, Ilość czynników, Liczba - najwięcej różnych czynników, Ilość różnych czynników"
  tests="99792 10 62790 6\t20992 10 62790 6\t56064 10 62790 6"
  path="formula-2015/2022/maj/liczby.txt"
  testPath="formula-2015/2022/maj/przyklad.txt"
  />

</TestProvider>

<TestProvider pkt=4 showOnDefault>

<TestPython
  terminal
  parameters=
  "Ilość dobrych trójek\nIlość dobrych piątek\nWszystkie dobre trójki (każda w osobnej lini)"
  tests=
  "27\n2\n955 8595 42975\n232 13688 27376\n13594 27188 81564\n971 13594 81564\n971 13594 27188\n971 27188 81564\n971 6797 81564\n971 6797 13594\n971 6797 27188\n797 7173 64557\n1403 42090 84180\n1403 2806 42090\n1403 2806 84180\n1403 2806 8418\n1403 8418 42090\n1403 8418 84180\n871 15678 62712\n497 22365 89460\n2806 42090 84180\n2806 8418 42090\n2806 8418 84180\n392 20384 61152\n409 9816 58896\n8418 42090 84180\n6797 13594 81564\n6797 13594 27188\n6797 27188 81564"
  path="formula-2015/2022/maj/liczby.txt"
  testPath="formula-2015/2022/maj/przyklad.txt"
  />

</TestProvider>
