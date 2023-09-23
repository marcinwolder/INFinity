import React, { useContext } from "react";
import { MenuContext, MenuLink } from "../context/menuContext";
import { usePathElements } from "../redux/slices/pathSlice";
import { Link } from "react-router-dom";
import _ from "lodash";
import useCurrentMatura from "../hooks/useCurrentMatura";

const useMarkSelect = (elements: React.ReactElement) => {
  const path = usePathElements();
  const values = [];
  for (const element of elements.props.children) {
    if (element.props.url === path[1])
      values.push(
        <li
          key={element.props.url}
          className="bordered rounded-r-lg border-l-2 border-l-secondary bg-base-200"
        >
          {element}
        </li>,
      );
    else values.push(<li key={element.props.url}>{element}</li>);
  }
  return values;
};

const Menu = () => {
  const path = usePathElements();
  const { setOpen } = useContext(MenuContext);
  const currentMatura = useCurrentMatura();
  return (
    <ul className="menu h-screen w-80 bg-base-100 p-4 text-base-content">
      <li className="menu-title py-2">
        <span>ARKUSZE</span>
      </li>
      {useMarkSelect(
        <>
          <MenuLink url="/formula-2023">
            Formuła 2023
            <span className="badge badge-secondary ml-auto">NOWA!</span>
          </MenuLink>
          <MenuLink url="/formula-2015">Formuła 2015</MenuLink>
          <MenuLink url="/formula-stara">Stara Formuła</MenuLink>
        </>,
      )}
      <li className="menu-title py-2">
        <span>INNE</span>
      </li>
      {useMarkSelect(
        <>
          <MenuLink url="/material">
            Materiał
            <span className="badge badge-outline">Aktualizacja 2023</span>
          </MenuLink>
          <MenuLink url="/kursy">Oferta kursów</MenuLink>
        </>,
      )}
      {!_.isEmpty(currentMatura) && path[1] === "/" ? (
        <Link
          className="btn btn-ghost mb-4 mt-auto text-success outline outline-1 outline-success"
          to={`/${currentMatura.formula}/${currentMatura.date}`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <div className="mr-2 h-2 w-2 animate-ping rounded-full bg-success" />
          Wróć do rozpoczętej matury
        </Link>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Menu;
