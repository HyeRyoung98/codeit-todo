import ButtonAddLargeDefault from '../assets/buttonAddLargeDefault.svg'
import ButtonAddSmallDefault from '../assets/buttonAddSmallDefault.svg'
import ButtonAddLargeActive from '../assets/buttonAddLargeActive.svg';
import ButtonAddSmallActive from '../assets/buttonAddSmallActive.svg';
import "./TodoAddButton.css"

interface TodoAddButtonProps {
    isTodosEmpty: boolean;
    onClick: () => void;
}

const TodoAddButton: React.FC<TodoAddButtonProps> = ({ isTodosEmpty, onClick }) => {

    return (
        <button
            type="button"
            className="register-button"
            onClick={onClick}>
            <picture>
                <source media="(max-width: 480px)" srcSet={isTodosEmpty ? ButtonAddSmallActive : ButtonAddSmallDefault} />
                <source media="(max-width: 1024px)" srcSet={isTodosEmpty ? ButtonAddLargeActive : ButtonAddLargeDefault} />
                <img src={isTodosEmpty ? ButtonAddLargeActive : ButtonAddLargeDefault} />
            </picture>
        </button>
    )
}

export default TodoAddButton