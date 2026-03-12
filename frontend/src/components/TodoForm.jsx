import { createTodo } from "../api/todo.api.js";
import React, { useState } from 'react';

export const TodoForm = ({ onTodoCreated, userId }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMsg("");
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        if(!formData.title) {
            setErrorMsg("Title of the todo must be required");
            setIsLoading(false);
            return;
        }

        try {
            
            const response = await createTodo(userId, formData.title, formData.description);
            onTodoCreated(response.todo);
            setFormData({
                title: "",
                description: "",
            });
            setSuccessMsg("Todo created Successfully");
        } catch (error) {
            setErrorMsg(error.message || "Creating a new todo failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="todo-form-page">
            <h2>Create a Todo</h2>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            {successMsg && <div className="success-message">{successMsg}</div>}
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="form-group-title">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Give a title for a Todo"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group-description">
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Give a description for a Todo"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group-status">
                    <label htmlFor="status">Status</label>
                </div>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Creating a Todo..." : "Submit"}
                </button>
            </form>
        </div>
    )

}