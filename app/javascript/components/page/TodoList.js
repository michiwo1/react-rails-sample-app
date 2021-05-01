import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
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
`;

const RemoveCompletedTodo = styled.button`
  width: 18%;
  height: 40px;
  background: #00aa00;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  float: right;
`;

const TodoName = styled.span`
  font-size: 27px;
  /* is_completedがtrueの時に表示させる */
  ${({ is_completed }) =>
    is_completed &&
    `
    opacity: 0.4;
    text-decoration: line-through;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
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

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchName, setSearchName] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/v1/todos.json")
      .then(resp => {
        console.log(resp.data);
        const imCompletedTodos = resp.data.filter(
          data => data.is_completed === false
        );
        setTodos(imCompletedTodos);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const removeAllCheckedTodos = () => {
    const sure = window.confirm(
      "本当に選択したTodoを削除を削除してよろしいでしょうか？"
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

  const removeCompletedTodos = () => {
    history.push("/todos/completed");
  };

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

  return (
    <>
      <h1>Todoリスト</h1>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="検索"
          onChange={event => {
            setSearchName(event.target.value);
          }}
        />
      </SearchAndButtton>
      <div>
        {todos
          .filter(val => {
            if (searchName === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchName.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
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
      </div>
      <RemoveAllCheckedButton onClick={removeAllCheckedTodos}>
        Todoを削除
      </RemoveAllCheckedButton>
      <RemoveCompletedTodo onClick={removeCompletedTodos}>
        完了済みに移動
      </RemoveCompletedTodo>
    </>
  );
};
