import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTodos } from '../todosSlice';
import styles from './TodosList.module.css';
import { LiItem } from '../components/LiItem';

export const TodosList = () => {
    const todos = useSelector(selectAllTodos);
    
    

    const renderedTodos = todos.slice(0, 10).map((todo) => (
        <li key={todo.id}>
            <LiItem todo={todo}></LiItem>   
        </li>
    ))
    
    const [upperExcessBarStyle, setUpperExcessBarStyle] = useState({
        display: 'none',
        position: 'absolute',
        top: '3%',
        textAlign: 'center',
        width: '100%',
        transition: '0.3s',
    });

    const [lowerExcessBarStyle, setLowerExcessBarStyle] = useState({
        display: 'block',
        position: 'absolute',
        bottom: '3%',
        textAlign: 'center',
        width: '100%',
        transition: '0.3s',
    });

    const scrollingElement = useRef();
    
    
    const showExcessBars = useCallback(() => {
        const scrollHeight = scrollingElement.current.scrollHeight;

        if (scrollingElement.current.scrollTop > scrollHeight * 0.08 && scrollingElement.current.scrollTop < scrollHeight * 0.4) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
        } else if (scrollingElement.current.scrollTop > scrollHeight * 0.4) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'none'}
            });
           
        } else if (scrollingElement.current.scrollTop < scrollHeight * 0.08) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'none'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
        }
    }, [scrollingElement])

    useLayoutEffect(() => {
        showExcessBars()
    }, [showExcessBars])
    
    return (
        <section>
            <h2>Todos</h2>

            <div  className={styles.scrolling_container}>
                <div style={upperExcessBarStyle}>More todos...</div>
                    
                <ul className={styles.todos_list}
                    ref={scrollingElement} 
                    onScroll={showExcessBars} >
                    {renderedTodos}
                </ul>
                <div  style={lowerExcessBarStyle}>More todos...</div>
            </div>
        </section>
    )
}