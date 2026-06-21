import ButtonEditDefault from '../assets/buttonEditDefault.svg'
import ButtonEditActive from '../assets/buttonEditActive.svg'
import "./EditButton.css"

interface EditButtonProps {
    isEdited: boolean;
    onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ isEdited, onClick }) => {

    return (
        <button
            type="button"
            className="edit-button"
            onClick={isEdited ? onClick : () => { alert("변경사항이 없습니다.") }}>
            <img src={isEdited ? ButtonEditActive : ButtonEditDefault} />
        </button>
    )
}

export default EditButton