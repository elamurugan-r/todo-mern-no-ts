import * as ENDPOINTS from "./endpoints";
import { useEffect, useRef } from "react";
import { useExpress } from "./useExpress";
import { Todo } from "./Todo";

import "./App.css";

const regex = /^\s*$/;

const App = () => {
  const writeRef = useRef();
  const [todos, setTodos, req] = useExpress();

  const handleClick = (todo) => {
    req(ENDPOINTS.UPDATE(todo._id), "PUT", {
      ...todo,
      complete: !todo.complete,
      timestamp: Date.now(),
    });
  };
  const handleOnChange = (e, i) => {
    setTodos((todos) =>
      todos.map((todo, index) => {
        if (i === index) {
          todo.text = e.target.value;
        }
        return todo;
      })
    );
  };
  const handleSubmitText = (e, todo) => {
    const text = e.target.value;
    const id = e.target.id;
    if (!regex.test(text) && e.keyCode === 13) {
      if (id === "-1") {
        req(ENDPOINTS.POST, "POST", { text: text });
      } else {
        req(ENDPOINTS.UPDATE(id), "PUT", { ...todo, timestamp: Date.now() });
        writeRef.current.focus();
      }
    }
  };
  const handleClose = (id) => {
    req(ENDPOINTS.DELETE(id), "DELETE");
  };

  useEffect(() => {
    req(ENDPOINTS.GET, "GET", todos);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h1 className="greeting">Welcome, Elamurugan</h1>
      <h2 className="subtitle">Your Tasks</h2>
      <ul className="todos-container">
        {todos.map((todo, index) => {
          const isLast = todos.length - 1 === index;
          return (
            <Todo
              key={index}
              todo={todo}
              handleOnChange={handleOnChange}
              handleClick={handleClick}
              handleSubmitText={handleSubmitText}
              handleClose={handleClose}
              index={index}
              textRef={isLast ? writeRef : undefined}
              isLast={isLast}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
