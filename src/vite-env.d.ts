/// <reference types="vite/client" />

declare module "*.md" {
  const value: string;
  export default value;
}

declare module JSX {
  export interface IntrinsicElements {
    "py-repl": any;
    "py-script": any;
    "py-config": any;
    script: JSX.IntrinsicElements.script & { config: string };
  }
}
