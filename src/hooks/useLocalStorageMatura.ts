import { useEffect, useState } from "react";
import { Matura } from "../redux/slices/answersSlice";

const useLocalStorageMatura = () => {
  const [currentMatura, setCurrentMatura] = useState<Matura>({} as Matura);
  useEffect(() => {
    if (window.localStorage.answers) {
      setCurrentMatura(JSON.parse(window.localStorage.answers) as Matura);
    } else setCurrentMatura({} as Matura);
  }, [window.localStorage.answers]);
  return currentMatura;
};

export default useLocalStorageMatura;
