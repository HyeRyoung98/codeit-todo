import "./TodoInput.css"

interface TodoInputProps {
    inputValue: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ inputValue, onChange, onSubmit }) => {
    return (
        <input
            type="text"
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") { onSubmit(); }
            }}
            placeholder="할 일을 입력해주세요"
            className="todo-input"
        />
    )

}

export default TodoInput