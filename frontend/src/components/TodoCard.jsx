import { updateTodo } from "../api/todo.api.js";
import { useState } from "react";
import { TodoForm } from "./TodoForm.jsx";

export const TodoCard = ({ todo, onDelete, onStatusChange }) => {
    const [formData, setFormData] = useState({
        title: TodoForm.title,
        description: TodoForm.description,
        status: TodoForm.status
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const updatetodo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        try {
           const response = await updateTodo(formData);
           if(response.success) {
            setFormData({
                title: response.title,
                dscription: response.description,
            })
           } 
           setSuccessMsg("Todo updated successfully");
        } catch (error) {
            setErrorMsg(error.message || "Failed to update a todo");
        } finally {
            setIsLoading(false);
        }
    } 

    return (
        <div className={`todo-card ${todo.status ? "completed" : "incomplete"}`}>
            <button onClick={updatetodo} className="del-btn" disabled={isLoading}>
                <TodoForm />
            </button>
            <button onClick={() => onDelete(todo._id)} className="del-btn" disabled={isLoading}>
                {isLoading ? "Deleting a Todo..." : "Delete"}
            </button>
            <h2>{formData.title}</h2>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            {successMsg && <div className="success-message">{successMsg}</div>}
            <p>{formData.description}</p>
            <button onClick={() => onStatusChange(todo._id, !todo.status)}>
                {todo.status ? "Incomplete" : "Completed"}
            </button>
        </div>
    )
}