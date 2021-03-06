import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const TodoName = styled.span`
  font-size: 27px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f05f68;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  float: right;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const RemoveAllCheckedButton = styled.button`
  width: 18%;
  height: 40px;
  background: #ff9900;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  float: right;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

export const CompletedTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/todos.json")
      .then(resp => {
        console.log(resp.data);
        const completedTodos = resp.data.filter(
          data => data.is_completed === true
        );
        setTodos(completedTodos);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const updateIsCompleted = (index, val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed
    };
    axios.patch(`/api/v1/todos/${val.id}`, data).then(resp => {
      const newTodos = [...todos];
      newTodos[index].is_completed = resp.data.is_completed;
      setTodos(newTodos);
    });
  };

  const removeAllTodos = () => {
    const sure = window.confirm(
      "??????????????????Todo?????????????????????????????????????????????"
    );
    if (sure) {
      axios
        .delete("/api/v1/todos/destroy_all")
        .then(resp => {
          setTodos([]);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const removeAllCheckedTodos = () => {
    const sure = window.confirm(
      "?????????????????????Todo??????????????????????????????????????????????????????"
    );
    if (sure) {
      axios
        .delete("/api/v1/todos/checked_todos_destroy")
        .then(resp => {
          axios
            .get("/api/v1/todos.json")
            .then(resp => {
              setTodos(resp.data);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log();
        });
    }
  };

  return (
    <>
      <h1>???????????????Todo</h1>
      {todos.map((val, key) => {
        return (
          <Row key={key}>
            {val.is_completed ? (
              <CheckedBox>
                <ImCheckboxChecked
                  onClick={() => updateIsCompleted(key, val)}
                />
              </CheckedBox>
            ) : (
              <UncheckedBox>
                <ImCheckboxUnchecked
                  onClick={() => updateIsCompleted(key, val)}
                />
              </UncheckedBox>
            )}
            <TodoName is_completed={val.is_completed}>{val.name}</TodoName>
            <Link to={"/todos/" + val.id + "/edit"}>
              <EditButton>
                <AiFillEdit />
              </EditButton>
            </Link>
          </Row>
        );
      })}
      <RemoveAllButton onClick={removeAllTodos} disabled={!todos.length}>
        ????????????
      </RemoveAllButton>
      <RemoveAllCheckedButton
        onClick={removeAllCheckedTodos}
        disabled={!todos.length}
      >
        Todo?????????
      </RemoveAllCheckedButton>
    </>
  );
};
