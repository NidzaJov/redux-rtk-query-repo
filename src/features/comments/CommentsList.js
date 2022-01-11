import { useContext, createContext, useReducer } from "react";
import { CommentsContext } from "./CommentsForPostPage";
import { useToogle } from "./useToogle";
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
    return (
        <div>
            {data.ids.map(id => <div key={id}>
                <commentContext.Provider value={data.entities[id]}>
                    <Comment></Comment>
                </commentContext.Provider>
            </div>)}
        </div>
        
    )
}