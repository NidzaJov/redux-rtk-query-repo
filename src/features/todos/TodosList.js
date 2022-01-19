import React, { useState, useRef } from 'react';
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
    
    const [upperExcessBarStyle, setUpperExcessBarStyle] = useState({
        display: 'none',
        position: 'absolute',
        top: '0px',
        textAlign: 'center',
        width: '100%',
        transition: '0.3s',
    });
    const [lowerExcessBarStyle, setLowerExcessBarStyle] = useState({
        display: 'block',
        position: 'absolute',
        bottom: '186px',
        textAlign: 'center',
        width: '100%',
        transition: '0.3s',
    } );
    const scrollingElement = useRef();

    
    const showExcessBars = () => {
        console.log('Scrolling');
        
        console.log('Styles:', upperExcessBarStyle, lowerExcessBarStyle);
        const scrollBottom = scrollingElement.current.scrollHeight - scrollingElement.current.scrollTop;
        console.log(scrollingElement.current.scrollTop, scrollBottom);
        if (scrollingElement.current.scrollTop > 60 && scrollingElement.current.scrollTop < 250) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
        } else if (scrollingElement.current.scrollTop > 250) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'none'}
            });
           
        } else if (scrollingElement.current.scrollTop < 60) {
            setUpperExcessBarStyle(style => {
                return { ...style, display: 'none'}
            });
            setLowerExcessBarStyle(style => {
                return { ...style, display: 'block'}
            });
        }
        
    }
    

    return (
        <section>
            <h2>Todos</h2>
            <div  className={styles.scrolling_container}
                >
                <div style={upperExcessBarStyle}>More todos...</div>
                <ul  ref={scrollingElement} className={styles.todos_list}
                onScroll={showExcessBars} >
                    {renderedTodos}
                </ul>
                <div  style={lowerExcessBarStyle}>More todos...</div>
            </div>
            
        </section>
    )
}