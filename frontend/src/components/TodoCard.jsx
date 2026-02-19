import { updateTodo, deleteTodo, changeStatus } from "../api/todo.api.js";
import { useState } from "react";
import { TodoForm } from "./TodoForm.jsx";

export const TodoCard = () => {
    const [status, setStatus] = useState(false);
    const [formData, setFormData] = useState({
        title: TodoForm.title,
        description: TodoForm.description,
        status: TodoForm.status
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setErrorMsg("");
    }

    const changestatus = async (status) => {
        setStatus(status);
        await changeStatus(status);
    };

    const deletetodo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const response = await deleteTodo(e._id);
            if(response.success) {
                setFormData("")
            }
            setSuccessMsg("Todo deleted Successfully");
        } catch (error) {
            setErrorMsg(error.message || "Failed to delete the todo");
        } finally {
            setIsLoading(false);
        }
    }

    const updatetodo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        try {
           const { ...formData } = formData;
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
        <div className={`todo-card-page ${status === "false" ? "incomplete" : "completed"}`}>
            <button onClick={updatetodo} className="del-btn" disabled={isLoading}>
                {TodoForm}
            </button>
            <button onClick={deletetodo} className="del-btn" disabled={isLoading}>
                {isLoading ? "Deleting a Todo..." : "Delete"}
            </button>
            <h2>{formData.title}</h2>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            {successMsg && <div className="success-message">{successMsg}</div>}
            <p>{formData.description}</p>
            <button onClick={changestatus}></button>
        </div>
    )
}