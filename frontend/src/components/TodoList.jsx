import { TodoCard } from "./TodoCard";

export const TodoList = ({ todos, onDelete, onStatusChange, onUpdate, label }) => {
    if (!todos || todos.length === 0) {
        return (
            <div className="todo-list-section">
                {label && (
                    <div className="section-label">
                        {label}
                        <span className="count-badge">0</span>
                    </div>
                )}
                <div className="empty-state">
                    <div className="empty-icon">
                        {label?.toLowerCase().includes("complete") ? "✅" : "📝"}
                    </div>
                    <p>No {label?.toLowerCase() || "todos"} yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-list-section">
            {label && (
                <div className="section-label">
                    {label}
                    <span className="count-badge">{todos.length}</span>
                </div>
            )}
            <div className="todo-list-wrapper">
                <div className="todo-list">
                    {todos.map((todo) => (
                        <TodoCard
                            key={todo._id}
                            todo={todo}
                            onDelete={onDelete}
                            onStatusChange={onStatusChange}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};