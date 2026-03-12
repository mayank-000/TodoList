import { updateTodo } from "../api/todo.api.js";
import { useState } from "react";

export const TodoCard = ({ todo, onDelete, onStatusChange, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
    })
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    }

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
            setErrorMsg(error.message || "Failed to update a todo");
        } finally {
            setIsLoading(false);
        }
    } 

    const handleCancelEdit = () => {
        // reset back to original values if user cancels
        setFormData({ title: todo.title, description: todo.description });
        setIsEditing(false);
        setErrorMsg("");
    }

    return (
        <div className={`todo-card ${todo.status ? "completed" : "incomplete"}`}>
            {isEditing ? (
                // EDIT MODE - shows inputs
                <div className="edit-mode">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errorMsg && <div className="error-message">{errorMsg}</div>}
                    <button onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={handleCancelEdit} disabled={isLoading}>
                        Cancel
                    </button>
                </div>
            ) : (
                // VIEW MODE - shows text
                <div className="view-mode">
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button onClick={() => onDelete(todo._id)} disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button onClick={() => onStatusChange(todo._id, !todo.status)}>
                        {todo.status ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </div>
            )}
        </div>
    )
}