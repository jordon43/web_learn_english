"use client";

import Link from "next/link";
import * as SC from "./styles";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import { routes } from "@/shared/config/routes";
import { Button } from "@mui/material";
import {
  useGetDataUserQuery,
  useLogoutUserMutation,
} from "@/entities/user/api/userApi";
import { useEffect } from "react";
import { UserInfo, userInfo } from "@/entities/user/ui/UserInfo";
import { useAppSelector } from "@/shared/store/hooks";

export const Header = () => {
  const pathname = usePathname();

  const router = useRouter();
  const [logout, { isLoading, isSuccess }] = useLogoutUserMutation();
  const {} = useGetDataUserQuery();
  const userData = useAppSelector((state) => state.userSlice.userData);

  useEffect(() => {
    if (isSuccess) router.push("/login");
  }, [isSuccess, router]);

  return (
    <SC.HeaderWrapper>
      <SC.NavWrapper>
        {routes?.map((route) => (
          <NavLink
            key={route.path}
            href={route.path}
            $active={pathname === route.path}
            data-testid={route.path}
          >
            {route.name}
          </NavLink>
        ))}
        <UserInfo userData={userData} />
        <Button onClick={logout} loading={isLoading} disabled={isLoading}>
          Выйти
        </Button>
      </SC.NavWrapper>
    </SC.HeaderWrapper>
  );
};

const NavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#ffffff" : "#333")};
  transition: color 0.1s;

  &:hover {
    color: #ffffff;
  }
`;
