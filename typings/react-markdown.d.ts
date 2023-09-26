import { Components as ComponentsOld } from "react-markdown";

type ComponentsNames =
  | "answerbtn"
  | "testprovider"
  | "testradio"
  | "testinput"
  | "testarea"
  | "infobox"
  | "maturaerror"
  | "testpython"
  | "downloadbtn";

export type MaturaComponents = ComponentsOld &
  Partial<{ [keys in ComponentsNames]?: React.FC<any> }>;
