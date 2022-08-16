import React from "react";
import "./Column.scss";
import Task from "../Task/Task";
function Column() {
  return (
    <div className="column">
      <header> Brainstorm</header>
      <ul className="task-list">
        <Task />
      <li className="task-item">abc</li>
      <li className="task-item">abc</li>
      <li className="task-item">abc</li>
      </ul>

      <footer>Footer</footer>
    </div>
  );
}
export default Column;
