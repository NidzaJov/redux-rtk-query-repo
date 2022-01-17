import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTodos} from './todosSlice';
import styles from './TodosList.module.css';

export const TodosList = () => {
    const todos = useSelector(selectAllTodos);
    

    const LiItem = ({ todo }) => {
        const [checkBoxStyle, setCheckBoxStyle] = useState({ display: 'none'});
    const [liStyle, setLiStyle] = useState({ 
        backgroundColor: '#04AA6D',
        padding: '15px',
        width: '50%',
        fontSize: '14px',
        color: 'white',
        borderRadius: '0 5px 5px 0',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        transition: '0.3s'
    })

    const useHoverStyle = () => {
        setLiStyle(style => { 
            return { ...style, width: "100%" };
        });
        setCheckBoxStyle({ display: "block"})
    }

    const useOrdinaryStyle = () => {
        setLiStyle(style => {
            return { style, width: "50%"}
        });
        setCheckBoxStyle({ display: "none"})
    }

        return (
            <div className={styles.todo_li_item}
            onMouseEnter={useHoverStyle}
            onMouseLeave={useOrdinaryStyle}
            style={liStyle}>
                <div>
                    {todo.title}    
                </div>
                <div className={styles.todo_checkbox}>
                    <input type="checkbox" checked={todo.completed}
                        style={checkBoxStyle}></input>
                </div>
            </ div>
            
        )
    }

    const renderedTodos = todos.slice(0, 10).map((todo) => (
        <li key={todo.id}>
            <LiItem todo={todo}></LiItem>   
        </li>
    ))

    return (
        <section>
            <h2>Todos</h2>
            <ul className={styles.todos_list}>{renderedTodos}</ul>
        </section>
    )
}