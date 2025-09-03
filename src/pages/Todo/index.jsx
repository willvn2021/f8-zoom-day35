import React, { useState } from "react";
import Button from "../../components/Button";
import styles from "./Todo.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

let uniqId = 0;

function EmptyState({ message = "Chưa có task nào. Hãy thêm task đầu tiên!" }) {
    return <div className={styles.empty}>{message}</div>;
}

function Stats({ total, done, left, className = "" }) {
    return (
        <div className={`${styles.stats} ${className}`}>
            <span>
                Tổng: <b>{total}</b> task
            </span>
            <span className={styles.done}>
                Đã hoàn thành: <b>{done}</b> task
            </span>
            <span className={styles.left}>
                Còn lại: <b>{left}</b> task
            </span>
        </div>
    );
}

function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Lấy giá trị từ input
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn trang reload khi submit form

        if (inputValue.trim()) {
            setTodos([
                ...todos,
                { id: ++uniqId, text: inputValue, completed: false },
            ]);
        }

        setInputValue(""); // Reset input sau khi thêm
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    //Các biến thống kê
    const total = todos.length;
    const done = todos.filter((todo) => todo.completed).length;
    const left = total - done;

    return (
        <div className={styles.wrapper}>
            <h1>Todo List</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Nhập task mới..."
                />
                <button className={styles.addButton} type="submit">
                    Thêm task
                </button>
            </form>

            {/* Nếu không có Todo nào thì trả về Component EmptyState */}
            {todos.length === 0 && <EmptyState />}

            {/* List Todo */}
            <ul className={styles.taskList}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={clsx(styles.task, {
                            [styles.completed]: todo.completed,
                        })}
                    >
                        <input
                            id={`checkboxID-${todo.id}`}
                            type="checkbox"
                            className={styles.checkbox}
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <label
                            htmlFor={`checkboxID-${todo.id}`}
                            className={styles.taskLabel}
                        >
                            {todo.text}
                        </label>
                        <button
                            className={styles.removeButton}
                            onClick={() => removeTodo(todo.id)}
                            title="Xóa"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            {/* Stats */}
            {total > 0 && <Stats total={total} done={done} left={left} />}
        </div>
    );
}

export default Todo;
