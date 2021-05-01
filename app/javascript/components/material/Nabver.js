import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nabvar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const NavItems = styled.ul`
  display: flex;
  width: 600px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const Nabver = () => {
  return (
    <Nabvar>
      <Logo>
        <Link to="/todos">TODO</Link>
      </Logo>
      <NavItems>
        <NavItem>
          <Link to="/todos">Todosリスト</Link>
        </NavItem>
        <NavItem>
          <Link to="/todos/new">新しいTodoを追加</Link>
        </NavItem>
        <NavItem>
          <Link to="/todos/completed">完了済みのtodo</Link>
        </NavItem>
      </NavItems>
    </Nabvar>
  );
};
