import React from 'react';
import { db } from '../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './Todo.css';

const TodoItem = ({ todos, onDeleteTodo }) => {

    const handleCheckboxChange = async (todoId) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, status: todo.status === 'active' ? 'completed' : 'active' };
            }
            return todo;
        });

        const todoRef = doc(db, 'todos', todoId);
        await updateDoc(todoRef, { status: updatedTodos.find((todo) => todo.id === todoId).status });
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}
                    style={{
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid #3b3b3b',
                    }}>
                    <input
                        type="checkbox"
                        id={`checkbox-${todo.id}`}
                        className="round-checkbox"
                        checked={todo.status === 'completed'}
                        onChange={() => handleCheckboxChange(todo.id)}
                    />
                    <label htmlFor={`checkbox-${todo.id}`} className="round-checkbox-label">
                        {todo.status === 'completed' && (
                            <svg className="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#4CAF50" d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.36l7.3-7.29a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                            </svg>
                        )}
                    </label>
                    <span
                        style={{
                            flexGrow: 1,
                            marginRight: '8px',
                            marginLeft: '8px',
                            textDecoration: todo.status === "completed" ? 'line-through' : 'none',
                        }}
                    >
                        {todo.text}
                    </span>
                    <span
                        onClick={() => onDeleteTodo(todo.id)}
                        style={{
                            cursor: 'pointer',
                            marginRight: '15px',
                            fontSize: '16px',
                        }}
                    >
                        &#10006;
                    </span>
                    {/* <button onClick={() => onDeleteTodo(todo.id)}>Delete</button> */}
                </div>
            ))}
        </div>
    )
}

export default TodoItem
