import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";
import EditTodo from "./EditTodo";

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
  width: 400px;
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

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

export const App = () => {
  return (
    <>
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
        </NavItems>
      </Nabvar>
      <Wrapper>
        <Switch>
          <Route exact path="/todos" component={TodoList}></Route>
          <Route exact path="/todos/new" component={AddTodo}></Route>
          <Route path="/todos/:id/edit" component={EditTodo}></Route>
        </Switch>
      </Wrapper>
    </>
  );
};
