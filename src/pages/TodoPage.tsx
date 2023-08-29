import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./TodoPage.module.css";

const ToDo: React.FC = () => {
  const [valueTodo, setValueTodo] = useState("");

  const [editTodo, setEditTodo] = useState(false);
  const [temporaryTodo, setTemporaryTodo] = useState("");
  const [indexTodo, setIndexTodo] = useState<number | null>(null);

  const [todo, setTodo] = useState<string[]>([]);

  const addTodo = () => {
    if (!valueTodo) return alert("Ошибка! Поле пустое. Добавьте задачу!");

    setTodo([...todo, valueTodo.trim()]);

    setValueTodo("");
  };

  const loadTodoFromStorage = () => {
    const storageTodos = localStorage.getItem("todos");

    if (!storageTodos) return;

    const parsedTodos = JSON.parse(storageTodos);
    setTodo(parsedTodos);
  };

  useEffect(() => {
    loadTodoFromStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const deleteTodo = (index: number) => {
    const updatedTodos = todo.filter((_, i) => i !== index);

    setTodo(updatedTodos);

    setEditTodo(false);
  };

  const showEditTodo = (index: number) => {
    setEditTodo(true);
    setIndexTodo(index);
    setTemporaryTodo(todo[index]);
  };

  const saveTodo = () => {
    if (indexTodo === null) return alert("Выберите задачу");

    if (!temporaryTodo.trim())
      return alert("Ошибка! Поле пустое. Добавьте текст или удалите задачу");

    const newTodos = [...todo];
    newTodos[indexTodo] = temporaryTodo;

    setTodo(newTodos);
    setTemporaryTodo("");
    setEditTodo(false);
  };

  return (
    <div className={classNames("col-lg-8", styles.todoWrapper)}>
      <h2 className={styles.title}>Todo Application</h2>
      {editTodo ? (
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Edit todo..."
            value={temporaryTodo}
            onChange={(event) => setTemporaryTodo(event.target.value)}
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
              value={valueTodo}
              onChange={(event) => setValueTodo(event.target.value)}
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
