import { TestProvider, TestPython } from "../../../context/testContext";

import zadanie4 from "./img/4.png";
import polecenie1 from "./img/4-1.png";
import polecenie2 from "./img/4-2.png";
import polecenie3 from "./img/4-3.png";

const Python = () => {
  return (
    <>
      <TestProvider taskNum={4} title="Liczby">
        <img src={zadanie4} draggable={false} className="select-none pt-2" />
      </TestProvider>
      <TestProvider taskNum={4.1} pkt={4} showOnDefault>
        <img src={polecenie1} draggable={false} className="select-none pt-2" />
        <TestPython
          num={1}
          terminal
          tests={["18 93639"]}
          parameters={["ilość liczb, pierwsza z nich"]}
          dataPath="formula-2015/2022/maj/liczby.txt"
          testPath="formula-2015/2022/maj/przyklad.txt"
        />
      </TestProvider>
      <TestProvider taskNum={4.2} pkt={4} showOnDefault>
        <img src={polecenie2} draggable={false} className="select-none pt-2" />
        <TestPython
          num={2}
          terminal
          parameters={[
            "Liczba - najwięcej czynników, Ilość czynników, Liczba - najwięcej różnych czynników, Ilość różnych czynników",
          ]}
          tests={["99792 10 62790 6", "20992 10 62790 6", "56064 10 62790 6"]}
          dataPath="formula-2015/2022/maj/liczby.txt"
          testPath="formula-2015/2022/maj/przyklad.txt"
        />
      </TestProvider>
      <TestProvider taskNum={4.3} pkt={4} showOnDefault>
        <img src={polecenie3} draggable={false} className="select-none pt-2" />
        <TestPython
          num={3}
          terminal
          parameters={[
            "Ilość dobrych trójek",
            "Ilość dobrych piątek",
            "Wszystkie dobre trójki (każda w osobnej lini)",
          ]}
          tests={[
            "27\n2\n955 8595 42975\n232 13688 27376\n13594 27188 81564\n971 13594 81564\n971 13594 27188\n971 27188 81564\n971 6797 81564\n971 6797 13594\n971 6797 27188\n797 7173 64557\n1403 42090 84180\n1403 2806 42090\n1403 2806 84180\n1403 2806 8418\n1403 8418 42090\n1403 8418 84180\n871 15678 62712\n497 22365 89460\n2806 42090 84180\n2806 8418 42090\n2806 8418 84180\n392 20384 61152\n409 9816 58896\n8418 42090 84180\n6797 13594 81564\n6797 13594 27188\n6797 27188 81564",
          ]}
          dataPath="formula-2015/2022/maj/liczby.txt"
          testPath="formula-2015/2022/maj/przyklad.txt"
        />
      </TestProvider>
    </>
  );
};

export default Python;
