import { useEffect, useState } from 'react'
import { getTodos, createTodo, updateTodo } from "../api/todoApi";
import { useNavigate } from "react-router-dom";
import './TodoListPage.css'
import '../styles/colors.css';

import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import TodoAddButton from '../components/TodoAddButton';

import ImgTodo from '../assets/imgTodo.svg';
import ImgDone from '../assets/imgDone.svg';
import ImgEmptyTodoLarge from '../assets/imgEmptyTodoLarge.svg';
import ImgEmptyDoneLarge from '../assets/imgEmptyDoneLarge.svg';
import ImgEmptyTodoSmall from '../assets/imgEmptyTodoSmall.svg';
import ImgEmptyDoneSmall from '../assets/imgEmptyDoneSmall.svg';

import type { Todo } from '../types/types';

function TodoListPage() {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const maxInputLenth = 25;

    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsLoading(true);
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (!text.trim()) return;

        try {
            const createdTodo = await createTodo(text);
            setTodos((prev) => [...prev, {
                id: createdTodo.id,
                name: createdTodo.name,
                isCompleted: createdTodo.isCompleted
            }]);
            setText("");
        } catch (error) {
            console.error(error);
            alert("할 일 추가에 실패했어요.");
        }
    }

    const handleCheck = async (id: number) => {
        const targetTodo = todos.find((todo) => todo.id === id);
        if (!targetTodo) return;

        try {
            const updatedTodo = await updateTodo(id, {
                isCompleted: !targetTodo.isCompleted,
            });

            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? {
                        id: updatedTodo.id,
                        name: updatedTodo.name,
                        isCompleted: updatedTodo.isCompleted
                    } : todo
                )
            );
        } catch (error) {
            console.error(error);
            alert("상태 변경에 실패했어요.");
        }
    }

    const handleOnInput = (v: string) => {
        if (v.length > maxInputLenth) {
            setText(v.substr(0, maxInputLenth));
            alert('최대 25자까지 가능');
        } else {
            setText(v);
        }
    }

    const todoList = todos.filter((todo) => !todo.isCompleted);
    const doneList = todos.filter((todo) => todo.isCompleted);

    if (isLoading) return <div className="main-area">불러오는 중...</div>;
    return (
        <div className="main-area">
            <div className="input-area">
                <TodoInput
                    inputValue={text} onChange={handleOnInput} onSubmit={handleAddTodo}></TodoInput>
                <TodoAddButton isTodosEmpty={todoList.length === 0} onClick={handleAddTodo}></TodoAddButton>
            </div>
            <div className="todolist-area">
                <div className="todo-area">
                    <img src={ImgTodo} height="36px" />
                    {todoList.length === 0 ? (
                        <div className="empty-area">
                            <picture>
                                <source media="(max-width: 480px)" srcSet={ImgEmptyTodoSmall} />
                                <source media="(max-width: 1024px)" srcSet={ImgEmptyTodoLarge} />
                                <img src={ImgEmptyTodoLarge} />
                            </picture>
                            <span>할 일이 없어요.</span>
                            <span>TODO를 새롭게 추가해주세요!</span>
                        </div>
                    ) : (
                        todoList.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onChange={handleCheck}
                                onMove={() => { navigate(`/items/${todo.id}`) }}
                            />
                        ))
                    )}
                </div>
                <div className="done-area">
                    <img src={ImgDone} />
                    {doneList.length === 0 ? (
                        <div className="empty-area">
                            <picture>
                                <source media="(max-width: 480px)" srcSet={ImgEmptyDoneSmall} />
                                <source media="(max-width: 1024px)" srcSet={ImgEmptyDoneLarge} />
                                <img src={ImgEmptyDoneLarge} />
                            </picture>
                            <span>아직 다 한 일이 없어요.</span>
                            <span>해야 할 일을 체크해보세요!</span>
                        </div>
                    ) : (
                        doneList.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onChange={handleCheck}
                                onMove={() => { console.log("상세 페이지 이동") }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoListPage
