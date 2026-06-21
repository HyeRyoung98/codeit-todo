import ImgMemo from "../assets/imgMemo.svg";
import "./Memo.css";


interface MemoProps {
    memoText: string,
    onChange: (value: string) => void;
}

const Memo: React.FC<MemoProps> = ({ memoText, onChange }) => {
    return (
        <div className="memo-box">
            <img src={ImgMemo} alt="" className="memo-bg" />
            <div className="memo-textarea">
                <div className="memo-title">Memo</div>
                <textarea
                    className="memo-text"
                    value={memoText}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="메모를 입력하세요"
                />
            </div>
        </div>
    );
}


export default Memo