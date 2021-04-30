import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { TodoList } from "./page/TodoList";
import { AddTodo } from "./page/AddTodo";
import EditTodo from "./page/EditTodo";

const SWrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

export const Wrapper = () => {
  return (
    <SWrapper>
      <Switch>
        <Route exact path="/todos" component={TodoList}></Route>
        <Route exact path="/todos/new" component={AddTodo}></Route>
        <Route path="/todos/:id/edit" component={EditTodo}></Route>
      </Switch>
    </SWrapper>
  );
};
