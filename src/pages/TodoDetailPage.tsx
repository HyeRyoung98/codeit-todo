import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoDetail, updateTodo, deleteTodo, uploadImage } from "../api/todoApi";

import TodoCheckbox from "../components/TodoCheckbox";
import ImageUploader from "../components/ImageUploader";
import Memo from "../components/Memo";

import './TodoDetailPage.css'
import type { TodoDetail } from "../types/types";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";


export default function TodoDetailPage() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [todo, setTodo] = useState<TodoDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEdited, setIsEdited] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const maxMemoLength = 300;

    useEffect(() => {
        async function fetchTodoDetail() {
            if (!id) return;

            try {
                const data = await getTodoDetail(Number(id));

                setTodo(data);
            } catch (error) {
                console.error(error);
                alert("상세 정보를 불러오지 못했어요.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchTodoDetail();
    }, [id]);

    const handleTodoCheck = () => {
        if (!todo) return;

        setTodo({
            ...todo,
            isCompleted: !todo.isCompleted,
        });

        setIsEdited(true);
    }

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!todo) return;

        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        const previewUrl = URL.createObjectURL(file);

        setTodo({
            ...todo,
            imageUrl: previewUrl,
        });

        setIsEdited(true);
    };

    const handleMemoInput = (v: string) => {
        if (!todo) return;

        if (v.length > maxMemoLength) {
            setTodo({
                ...todo,
                memo: v.substr(0, maxMemoLength),
            });
            alert('최대 300자까지 가능');
        } else {
            setTodo({
                ...todo,
                memo: v,
            });
        }

        setIsEdited(true);
    };

    const handleEdit = async () => {
        if (!todo) return;

        try {
            let imageUrl = todo.imageUrl;

            console.log(`1 : {imageUrl}`);

            // 새 이미지 선택한 경우
            if (selectedFile) {
                imageUrl = await uploadImage(
                    selectedFile
                );
                console.log(`2 : {imageUrl}`);
            }

            const updatedTodo = await updateTodo(todo.id, {
                memo: todo.memo,
                imageUrl,
                isCompleted: todo.isCompleted,
            });

            setTodo(updatedTodo);
            setSelectedFile(null);
            setIsEdited(false);

            alert("수정되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("수정에 실패했어요.");
        }
    }

    const handleDelete = async () => {
        if (!todo) return;

        try {
            await deleteTodo(todo.id);
            alert("삭제되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("삭제에 실패했어요.");
        }
    };

    if (isLoading) return <div className="bg-area">불러오는 중...</div>;
    if (!todo) return <div className="bg-area">Todo를 찾을 수 없습니다.</div>;
    return (
        <div className="bg-area">
            <div className="detail-main-area">
                <TodoCheckbox
                    isCompleted={todo?.isCompleted ?? false}
                    todoName={todo?.name ?? ""}
                    onChange={handleTodoCheck}
                />
                <div className="img-memo-area">
                    <ImageUploader imageUrl={todo?.imageUrl ?? ""} onChangeImage={handleImageChange}></ImageUploader>
                    <Memo memoText={todo?.memo ?? ""} onChange={handleMemoInput}></Memo>
                </div>
                <div className="button-area">
                    <EditButton isEdited={isEdited} onClick={handleEdit}></EditButton>
                    <DeleteButton onClick={handleDelete}></DeleteButton>
                </div>
                <h1>상세페이지</h1>
                <p>Todo ID: {id}</p>
            </div>
        </div>
    );
}