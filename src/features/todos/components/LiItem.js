import { useState } from "react";
import styles from './LiItem.module.css';

export const LiItem = ({ todo }) => {
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
            return { ...style, width: "80%" };
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
                <input type="checkbox" defaultChecked={todo.completed}
                    style={checkBoxStyle}></input>
            </div>
        </ div>
        
    )
}