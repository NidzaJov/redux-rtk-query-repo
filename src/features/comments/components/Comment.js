import { useContext, useReducer } from "react";
import { commentContext } from './CommentsList';
import { useToogle } from "../customHooks/useToogle";
import styles from './CommentsList.module.css'

export const Comment = () => {
    const comment = useContext(commentContext);

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