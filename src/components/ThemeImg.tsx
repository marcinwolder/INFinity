import React from "react";
import useThemeBasedValue, { ThemeOptions } from "../hooks/useThemeBasedValue";
import classNames from "classnames";

const ThemeImg: React.FC<
  (
    | { options: ThemeOptions<string>; light?: never; dark?: never }
    | { light: string; dark: string; options?: never }
  ) &
    React.ComponentProps<"img">
> = ({ light, dark, options, className, ...props }) => {
  const funcProps = options ? [options] : [light, dark];

  /*eslint-disable*/
  //@ts-ignore
  const imgUrl = useThemeBasedValue<string>(...funcProps);
  /*eslint-enable*/

  return (
    <img
      className={classNames("select-none", className)}
      draggable={false}
      {...props}
      src={imgUrl}
      alt="Logo"
    />
  );
};

export default ThemeImg;
