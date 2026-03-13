import { updateTodo } from "../api/todo.api.js";
import { useState } from "react";

// Simple SVG icons (no extra dependency needed)
const EditIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const DeleteIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
);

export const TodoCard = ({ todo, onDelete, onStatusChange, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleUpdate = async () => {
        if (!formData.title) {
            setErrorMsg("Title cannot be empty");
            return;
        }
        setIsLoading(true);
        setErrorMsg("");
        try {
            const response = await updateTodo(todo._id, formData.title, formData.description);
            onUpdate(response.todo);
            setIsEditing(false);
        } catch (error) {
            setErrorMsg(error.message || "Failed to update todo");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({ title: todo.title, description: todo.description });
        setIsEditing(false);
        setErrorMsg("");
    };

    return (
        <div className={`todo-card ${todo.status ? "completed" : "incomplete"}`}>
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        disabled={isLoading}
                    />
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        disabled={isLoading}
                    />
                    {errorMsg && <div className="error-message">{errorMsg}</div>}
                    <div className="edit-actions">
                        <button onClick={handleUpdate} disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                        <button className="cancel-btn" onClick={handleCancelEdit} disabled={isLoading}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="view-mode">
                    {/* ── Top-right icon buttons ── */}
                    <div className="card-actions">
                        <button
                            className="card-btn edit-btn"
                            onClick={() => setIsEditing(true)}
                            title="Edit"
                        >
                            <EditIcon />
                        </button>
                        <button
                            className="card-btn delete-btn"
                            onClick={() => onDelete(todo._id)}
                            disabled={isLoading}
                            title="Delete"
                        >
                            <DeleteIcon />
                        </button>
                    </div>

                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>

                    {/* ── Colored status button ── */}
                    <button
                        className="status-btn"
                        onClick={() => onStatusChange(todo._id, !todo.status)}
                    >
                        <span className="status-dot" />
                        {todo.status ? "Completed" : "Incomplete"}
                    </button>
                </div>
            )}
        </div>
    );
};