import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTodos} from './todosSlice';

export const TodosList = () => {
    const todos = useSelector(selectAllTodos);

    const renderedTodos = todos.slice(0, 10).map((todo) => (
        <li key={todo.id}>{todo.title}</li>
    ))

    return (
        <section>
            <h2>Todos</h2>
            <ul>{renderedTodos}</ul>
        </section>
    )
}