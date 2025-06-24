"use client";

import Link from "next/link";
import * as SC from "./styles";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const routes = [
  { path: "/words", name: "Изучение" },
  { path: "/repeat-words", name: "Для повторения" },
  { path: "/saved-words", name: "Сохраненные слова" },
  { path: "/favorite-words", name: "Избранные слова" },
];

export const Header = () => {
  const pathname = usePathname();
  return (
    <SC.HeaderWrapper>
      <SC.NavWrapper>
        {routes?.map((route) => (
          <NavLink
            key={route.path}
            href={route.path}
            active={pathname === route.path}
          >
            {route.name}
          </NavLink>
        ))}
      </SC.NavWrapper>
    </SC.HeaderWrapper>
  );
};

const NavLink = styled(Link)<{ active?: boolean }>`
  text-decoration: none;
  color: ${({ active }) => (active ? "#ffffff" : "#333")};
  transition: color 0.1s;

  &:hover {
    color: #ffffff;
  }
`;
