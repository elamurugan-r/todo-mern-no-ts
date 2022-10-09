import React, { useEffect } from "react";

const regex = /^\s*$/;

export const Todo = ({
  todo,
  handleOnChange,
  handleClick,
  handleSubmitText,
  handleClose,
  index,
  writeRef,
}) => {
  const isEmptyText = regex.test(todo.text);
  useEffect(() => {
    console.log("Todo mounted");
  },[todo])
  return (
    <li className="todo-item" key={todo._id}>
      <div className="todo-item-container">
        <input
          type="checkbox"
          value={todo.complete}
          className={`todo-check`}
          onClick={() => handleClick(todo)}
          disabled={isEmptyText}
          defaultChecked={todo.complete}
        />
      </div>
      <input
        type="text"
        id={todo._id}
        value={todo.text}
        className={`todo-text  ${isEmptyText ? "focus" : ""} ${
          todo.complete ? "completed" : ""
        }`}
        ref={isEmptyText ? writeRef : undefined}
        onChange={(e) => handleOnChange(e, index)}
        autoFocus={isEmptyText}
        onKeyDown={(e) => handleSubmitText(e, todo)}
        onBlur={handleSubmitText}
      />
      <div className="todo-item-container">
        <button className="todo-close" onClick={() => handleClose(todo._id)}>
          x
        </button>
      </div>
    </li>
  );
};
