import { useRef } from "react";
import GalleryIcon from "../assets/iconImg.svg";
import ButtonAddImg from "../assets/buttonAddImg.svg";
import ButtonEditImg from "../assets/buttonEditImg.svg"
import "./ImageUploader.css";


interface ImageUploaderProps {
    imageUrl: string,
    onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onChangeImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handlePlusClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className={`image-uploader ${imageUrl ? "has-image" : ""}`}>
            {imageUrl ? (
                <img src={imageUrl} alt="preview" className="preview-image" />
            ) : (
                <div className="image-placeholder">
                    <img src={GalleryIcon} alt="" className="gallery-icon" />
                </div>
            )}

            <button
                type="button"
                className="image-add-button"
                onClick={handlePlusClick}
            >
                <img src={imageUrl ? ButtonEditImg : ButtonAddImg} alt="이미지 추가" />
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden-file-input"
                onChange={(e) => onChangeImage(e)}
            />
        </div>
    );
}

export default ImageUploader