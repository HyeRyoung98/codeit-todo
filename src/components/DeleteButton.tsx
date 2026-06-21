import ButtonDelete from '../assets/buttonDelete.svg'
import "./DeleteButton.css"

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {

    return (
        <button
            type="button"
            className="delete-button"
            onClick={onClick}>
            <img src={ButtonDelete} />
        </button >
    )
}

export default DeleteButton