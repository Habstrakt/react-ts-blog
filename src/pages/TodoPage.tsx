import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./TodoPage.module.css";

const ToDo: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputEditRef = React.useRef<HTMLInputElement | null>(null);

  const [editTodo, setEditTodo] = useState(false);
  const [temporaryTodo, setTemporaryTodo] = useState<string>("");
  const [indexTodo, setIndexTodo] = useState<number | null>(null);

  const [todo, setTodo] = useState<string[]>([]);

  function addTodo() {
    const inputTodo = inputRef.current?.value;

    if (inputTodo) {
      setTodo((todos) => [...todos, inputTodo]);

      localStorage.setItem("todos", JSON.stringify([...todo, inputTodo]));

      inputRef.current.value = "";
    } else {
      alert("Ошибка! Поле пустое. Добавьте задачу!");
    }
  }

  useEffect(() => {
    const storageTodos = localStorage.getItem("todos");

    if (storageTodos) {
      const parsedTodos = JSON.parse(storageTodos);

      setTodo(parsedTodos);
    }
  }, []);

  function deleteTodo(index) {
    setTodo((todos) => {
      const updatedTodos = todos.filter((_, i) => i !== index);

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });

    setEditTodo(false);
  }

  function showEditTodo(index) {
    setEditTodo(true);
    setIndexTodo(index);
    setTemporaryTodo(todo[index]);
  }

  function saveTodo() {
    const editedTodo = inputEditRef.current?.value;

    if (editedTodo) {
      setTodo((todo) => {
        const updatedTodo = [...todo];

        updatedTodo[indexTodo] = editedTodo;

        localStorage.setItem("todos", JSON.stringify(updatedTodo));

        return updatedTodo;
      });

      setEditTodo(false);
    } else {
      alert("Ошибка! Поле пустое. Добавьте текст или удалите задачу");
    }
  }

  return (
    <div className={classNames("col-lg-8", styles.todoWrapper)}>
      <h2 className={styles.title}>Todo Application</h2>
      {editTodo ? (
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Edit todo..."
            defaultValue={temporaryTodo}
            ref={inputEditRef}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={saveTodo}
          >
            Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setEditTodo(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className={classNames("input-group", "mb-3", styles.inputBlock)}>
            <input
              type="text"
              className="form-control"
              placeholder="Add task...."
              ref={inputRef}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={addTodo}
            >
              Add Todo
            </button>
          </div>
          <div>
            <ul>
              {todo.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => showEditTodo(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger link-light ms-1"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
