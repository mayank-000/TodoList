import { TodoCard } from "./TodoCard"
export const TodoList = ({ todos, onDelete, onStatusChange }) => {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoCard
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    )
}