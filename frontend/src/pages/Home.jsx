import { useState, useEffect } from "react";
import { getTodos, deleteTodo, changeStatus } from "../api/todo.api.js";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("TodoAppTheme") === "dark";
    });

    const [userId] = useState(() => localStorage.getItem("TodoAppUID"));

    // Apply theme to <html> element
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("TodoAppTheme", "dark");
        } else {
            root.removeAttribute("data-theme");
            localStorage.setItem("TodoAppTheme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await getTodos(userId);
            setTodos(response.todos);
        };
        fetchTodos();
    }, [userId]);

    const handleDelete = async (todoId) => {
        await deleteTodo(todoId, userId);
        setTodos(todos.filter((todo) => todo._id !== todoId));
    };

    const handleUpdate = (updatedTodo) => {
        setTodos(todos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
        ));
    };

    const handleStatusChange = async (todoId, newStatus) => {
        await changeStatus(todoId, newStatus);
        setTodos(todos.map((todo) =>
            todo._id === todoId ? { ...todo, status: newStatus } : todo
        ));
    };

    const completedTodos = todos.filter((todo) => todo.status === true);
    const incompleteTodos = todos.filter((todo) => todo.status === false);

    return (
        <>
            {/* Dark/Light mode toggle */}
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle theme"
            >
                <span className="toggle-icon">{darkMode ? "☀️" : "🌙"}</span>
                {darkMode ? "Light" : "Dark"}
            </button>

            <div className="home-page">
                <TodoForm
                    userId={userId}
                    onTodoCreated={(newTodo) => setTodos([...todos, newTodo])}
                />

                <TodoList
                    label="In Progress"
                    todos={incompleteTodos}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onStatusChange={handleStatusChange}
                />

                <TodoList
                    label="Completed"
                    todos={completedTodos}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </>
    );
};

export default HomePage;