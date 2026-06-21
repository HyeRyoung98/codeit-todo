import IconChecked from '../assets/iconChecked.svg'
import IconUnchecked from '../assets/iconUnchecked.svg'
import "./TodoCheckbox.css"

interface TodoCheckboxProps {
  isCompleted: boolean;
  todoName: string;
  onChange: () => void;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ isCompleted, todoName, onChange }) => {

  return (
    <button
      type="button"
      className={`todo-checkbox ${isCompleted ? "checked" : ""}`}
      onClick={onChange}
    >
      <span className="todo-checkbox-check-circle">
        {isCompleted && (
          <img
            src={IconChecked}
            alt=""
            className="check-icon"
          />
        )}
        {!isCompleted && (
          <img
            src={IconUnchecked}
            alt=""
            className="check-icon"
          />
        )}
      </span>

      <span className="todo-checkbox-text">{todoName}</span>
    </button>

  )

}

export default TodoCheckbox