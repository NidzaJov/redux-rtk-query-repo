import { useContext, createContext, useReducer, useState } from "react";
import { CommentsContext } from "./CommentsForPostPage";
import { useToogle } from "./useToogle";
import { useTimeout } from "./useTimeout";
import styles from './CommentsList.module.css'
import { useUpdateEffect } from "./useUpdateEffect";
import { useArray } from "./useArray";


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
    const [value, setValue] = useState(10);
    console.log(value)
    //useDebounce(() => alert(value), 1000, [value])
    useUpdateEffect(() => {
        alert(value); 
    }, [value]) 
    const { array, set, push, filter, update, remove, clearArray } = useArray([1, 2, 3, 4, 5, 6])
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
            <div>
                <div>{value}</div>
                <button onClick={() => setValue(v => v + 1)}>Increment</button>
            </div>
            <div>
                <div>{array.join(', ')}</div>
                <button onClick={() => push(7)}>Push 7</button>
                <button onClick={() => update(1, 9)}>Change second element to 9</button>
                <button onClick={() => remove(1)} >Remove second element</button>
                <button onClick={() => filter(n => n < 3)}>Keep numbers less than 4</button>
                <button onClick={() => set([1, 2])}>Set to 1, 2</button>
                <button onClick={() => clearArray()}>Clear</button>
            </div>
        </div>
        
    )
}