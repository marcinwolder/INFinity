import { useEffect, useRef, useState } from "react";
import PartSwitch from "./PartSwitch";
import TabSwitch from "./TabSwitch";
import MaturaError from "./MaturaError";
import { useLoaderData } from "react-router-dom";
import { ExamPageLoader } from "../main";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MaturaComponents } from "../../typings/react-markdown";
import {
  AnswerBtn,
  TestArea,
  TestInput,
  TestProvider,
  TestRadio,
} from "../context/testContext";
import DownloadBtn from "./DownloadBtn";

const MarkdownComp: React.FC<{ url: string; num: number }> = ({ url, num }) => {
  const components: MaturaComponents = {
    testprovider: ({ children, pkt, title }) => {
      return (
        <TestProvider taskNum={num} pkt={pkt} title={title}>
          {children}
        </TestProvider>
      );
    },
    testradio: ({ num, positive }) => (
      <TestRadio num={num} positive={positive === ""} />
    ),
    testarea: ({ answer, num, passifnotsorted }) => {
      return (
        <TestArea
          answer={String(answer)
            .split(" ")
            .map((str) => str.replaceAll("\\t", "\t"))}
          num={num}
          passIfNotSorted={passifnotsorted === ""}
        />
      );
    },
    testinput: TestInput,
    answerbtn: AnswerBtn,
    downloadbtn: ({ urls }) => <DownloadBtn urls={String(urls).split(" ")} />,
    table: ({ children }) => (
      <table className="table border-b border-neutral-300">{children}</table>
    ),
    tr: ({ children }) => <tr className="border-neutral-300">{children}</tr>,
    thead: ({ children }) => (
      <thead className="font-mono uppercase text-black">{children}</thead>
    ),
    p: ({ children }) => (
      <p className="font-medium tracking-tight">{children}</p>
    ),
    maturaerror: MaturaError,
  };
  const [md, setMd] = useState("");
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) return res.text();
        else throw new Error("file-not-found");
      })
      .then((res) => {
        setMd(res);
      })
      .catch(() => setMd(`<MaturaError url="${url}" />`));
  }, []);
  return (
    <ReactMarkdown
      className="p-4"
      components={components}
      remarkPlugins={[remarkGfm]}
      // @ts-expect-error
      rehypePlugins={[rehypeRaw]}
      children={md}
    />
  );
};

const Index: React.FC = () => {
  const {
    currentExam: { formula, year, month, tasks, splitParts },
  } = useLoaderData() as ExamPageLoader;

  const comps: React.ReactNode[] = [];

  tasks.forEach((task, index) => {
    comps.push(
      <MarkdownComp
        num={index + 1}
        key={`/${formula}/${year}/${month}/${task}.md`}
        url={`/${formula}/${year}/${month}/${task}.md`}
      />,
    );
  });

  if (splitParts) {
    return (
      <div className="w-full max-w-screen-md sm:px-0 md:px-6">
        <PartSwitch
          Part1={
            <TabSwitch tabs={comps.slice(0, 3)} headers={tasks.slice(0, 3)} />
          }
          Part2={<TabSwitch tabs={comps.slice(3)} headers={tasks.slice(3)} />}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-md sm:px-0 md:px-6">
      <TabSwitch tabs={comps} headers={tasks} />
    </div>
  );
};

export default Index;
