import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../Firebase/firebase';
import { addDoc, collection, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import TodoItem from './TodoItem';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                await getDocs(query(collection(db, "todos"), where('userId', '==', user.uid)))
                    .then((querySnapshot) => {
                        const newData = querySnapshot.docs
                            .map((doc) => ({ ...doc.data(), id: doc.id }));
                        setTodos(newData);
                    })
            }
        };
        fetchData();
    }, [todos]);

    const handleAddTodo = async () => {
        const user = auth.currentUser;
        if (user && newTodo.trim() !== '') {
            // eslint-disable-next-line
            const todoRef = await addDoc(collection(db, 'todos'), {
                userId: user.uid,
                text: newTodo,
                status: 'active',
            });
            setNewTodo('');
        }
    };

    const handleDeleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
    };

    const handleClearCompleted = async () => {
        const completedTodos = todos.filter((todo) => todo.status === 'completed');
        await Promise.all(
            completedTodos.map((todo) => deleteDoc(doc(db, 'todos', todo.id)))
        );
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && newTodo.trim() !== '') {
            handleAddTodo();
            setNewTodo('');
        }
    };
    const allFilter = () => {
        const allTodos = todos.filter((todo) => todo.status === 'active' || todo.status === 'completed');
        setTodos(allTodos);
    };

    const activeFilter = () => {
        const activeTodos = todos.filter((todo) => todo.status === 'active');
        setTodos(activeTodos);
    };

    const completeFilter = () => {
        const completedTodos = todos.filter((todo) => todo.status === 'completed');
        setTodos(completedTodos);
    };
    const todoCount = todos.filter((todo) => todo.status === 'active').length;

    return (
        <>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '48px',
                    padding: '50px 0 50px 0',
                }}
                className='todo-heading'
            >
                📓 Todo List
            </h1>
            <div
                style={{
                    margin: '0 auto',
                    padding: '20px',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    backgroundColor: '#262629',
                    minHeight: '432px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    maxWidth: '600px',
                }}
            >
                <input
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        marginBottom: '10px',
                        height: '48px',
                        borderBottom: '1px solid #3b3b3b',
                        backgroundColor: '#262629',
                    }}
                    placeholder="Write your todos here..."
                    value={newTodo}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNewTodo(e.target.value)}
                    ref={inputRef}
                />
                <div>
                    <TodoItem todos={todos} onDeleteTodo={handleDeleteTodo} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        justifySelf: 'end',
                        marginTop: 'auto',
                    }}
                >
                    <span style={{ fontSize: '12px' }}>{todoCount} Todo(s) left</span>
                    <div style={{ display: 'flex' }}>
                        <button
                            onClick={allFilter}
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #3b3b3b',
                                padding: '10px 15px',
                                cursor: 'pointer',
                                marginRight: '10px',
                                fontSize: '12px',
                                borderRadius: '10px',
                            }}
                        >
                            All
                        </button>
                        <button
                            onClick={activeFilter}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '10px 15px',
                                cursor: 'pointer',
                                marginRight: '10px',
                                fontSize: '12px',
                                borderRadius: '10px',
                            }}
                        >
                            Active
                        </button>
                        <button
                            onClick={completeFilter}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '10px 15px',
                                cursor: 'pointer',
                                marginRight: 0,
                                fontSize: '12px',
                                borderRadius: '10px',
                            }}
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        onClick={handleClearCompleted}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            marginRight: '10px',
                            fontSize: '12px',
                            borderRadius: '10px',
                            visibility: todos.some((todo) => todo.status === 'completed')
                                ? 'visible'
                                : 'hidden',
                        }}
                    >
                        Clear Completed
                    </button>
                </div>
            </div>
        </>
    );
};

export default Todo;
