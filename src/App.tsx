import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/items/:id" element={<TodoDetailPage />} />
      </Routes>
    </div>
  );
}