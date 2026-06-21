import IconChecked from "../assets/iconChecked.svg";
import IconUnchecked from "../assets/iconUnchecked.svg";
import "./TodoItem.css";
import type { Todo } from "../types/types";

interface TodoItemProps {
  todo: Todo;
  onChange: (id: number) => void;
  onMove: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange, onMove }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? "checked" : ""}`}>
      <button
        type="button"
        className="check-button"
        onClick={() => onChange(todo.id)}
      >
        <img
          src={todo.isCompleted ? IconChecked : IconUnchecked}
          alt=""
          className="check-icon"
        />
      </button>

      <button
        type="button"
        className="todo-content-button"
        onClick={() => onMove(todo.id)}
      >
        <span className="todo-text">{todo.name}</span>
      </button>
    </div>
  );
};

export default TodoItem;