import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";
import { TodoList } from "./TodoList";

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`;

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1e90ff;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

toast.configure();

export const AddTodo = props => {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false
  };

  const [todo, setTodo] = useState(initialTodoState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...TodoList, [name]: value });
  };

  const notify = () => {
    toast.success("Todoを作成しました！", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const saveTodo = () => {
    var data = {
      name: todo.name
    };

    axios
      .post("/api/v1/todos", data)
      .then(resp => {
        setTodo({
          id: resp.data.id,
          name: resp.data.name,
          is_completed: resp.data.is_completed
        });
        notify();
        props.history.push("/todos");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>新しいTodo</h1>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={todo.name}
          name="name"
          onChange={handleInputChange}
          placeholder="新しいTodoを入力"
        />
        <Button
          onClick={saveTodo}
          disabled={!todo.name || /^\s*$/.test(todo.name)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  );
};
