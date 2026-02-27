import { useState, useEffect } from "react";
import { getTodos, deleteTodo, changeStatus } from "../api/todo.api";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  const [userId] = useState(() => {
    return localStorage.getItem("TodoAppUID");
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos(userId);
      setTodos(response.todos);
    };
    fetchTodos();
  }, [userId]);

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId, userId);
    setTodos(todos.filter((todo) => (todo !== todo._id) !== todoId));
  };

  const handleStatusChange = async (todoId, newStatus) => {
    await changeStatus(todoId, newStatus);
    setTodos(
      todos.map((todo) =>
        todo._id === todoId ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const completedTodos = todos.filter((todo) => todo.status === true);
  const incompleteTodos = todos.filter((todo) => todo.status === false);

  return (
    <div className="home-page">
        <TodoForm onTodoCreated={(newTodo) => setTodos([...todos, newTodo])}/>
        <TodoList
            todos={incompleteTodos}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
        />
        <TodoList
            todos={completedTodos}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
        />
    </div>
  )
};

export default HomePage;
