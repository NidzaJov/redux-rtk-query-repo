import { useContext, createContext, useReducer, useState } from "react";
import { CommentsContext } from "./CommentsForPostPage";
import { useToogle } from "./useToogle";
import { useTimeout } from "./useTimeout";
import styles from './CommentsList.module.css'


export const commentContext = createContext();

const commentReducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE':
            return {
                ...state,
                toggled: !state.toggled
            }
            default: {
                return state
            }
    }
}

const Comment = () => {
    const comment = useContext(commentContext);
    const [context, dispatch] = useReducer(commentReducer, { comment, toggled: false})
    const clickToggle = () => {
        dispatch({ type: 'TOGGLE'})
    }

    const [color, toggleValue] = useToogle(true);
    const changeTextColor = () => {
        toggleValue();
    }


    return (
        <div style={context.toggled? { backgroundColor: "red"} : {backgroundColor: "white"}}>
            <h5 className={color? styles.black_text : styles.blue_text}>{comment.name}</h5>
            <p className={color? styles.black_text : styles.blue_text}>{comment.body}</p>
            <input type="checkbox" onClick={clickToggle}></input>
            <button onClick={changeTextColor}>Change text color</button>
        </div>
    )
}

export const  CommentsList = () => {
    const data = useContext(CommentsContext)
    const [count, setCount] = useState(0);
    const { clear, reset } = useTimeout(() => setCount(count => count -1 ), 1000)
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount(10)}>Set</button>
            <button onClick={clear}>Clear TimeOut</button>
            <button onClick={reset}>Reset TimeOut</button>
            {data.ids.map(id => <div key={id}>
                <commentContext.Provider value={data.entities[id]}>
                    <Comment></Comment>
                </commentContext.Provider>
            </div>)}
        </div>
        
    )
}