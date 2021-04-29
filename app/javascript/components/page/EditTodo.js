import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`;

const IsCompeletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const EditButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
  border: none;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

toast.configure();

function EditTodo(props) {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false
  };

  const [currentTodo, setCurrentTodo] = useState(initialTodoState);

  const notify = () => {
    toast.success("Todo successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const getTodo = id => {
    axios
      .get(`/api/v1/todos/${id}`)
      .then(resp => {
        setCurrentTodo(resp.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateIsCompleted = val => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed
    };
    axios.patch(`/api/v1/todos/${val.id}`, data).then(resp => {
      setCurrentTodo(resp.data);
    });
  };

  const updateTodo = () => {
    axios
      .patch(`/api/v1/todos/${currentTodo.id}`, currentTodo)
      .then(response => {
        notify();
        props.history.push("/todos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    const sure = window.confirm("本当に削除してよろしいでしょうか？");
    if (sure) {
      axios
        .delete(`/api/v1/todos/${currentTodo.id}`)
        .then(resp => {
          console.log(resp.data);
          props.history.push("/todos");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h1>編集画面</h1>
      <div>
        <div>
          <label htmlFor="name">現在の名前</label>
          <InputName
            type="text"
            id="name"
            name="name"
            value={currentTodo.name}
            onChange={handleInputChange}
          />
          <div>
            <span>現在のステータス</span>
            <br />
            <CurrentStatus>
              {currentTodo.is_completed ? "完了" : "未完了"}
            </CurrentStatus>
          </div>
        </div>

        {currentTodo.is_completed ? (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentTodo)}
          >
            未完了にする
          </IsCompeletedButton>
        ) : (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentTodo)}
          >
            完了にする
          </IsCompeletedButton>
        )}
        <EditButton type="submit" onClick={updateTodo}>
          更新
        </EditButton>
        <DeleteButton className="badge badge-danger mr-2" onClick={deleteTodo}>
          削除
        </DeleteButton>
      </div>
    </>
  );
}

export default EditTodo;
