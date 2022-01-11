import { useContext, createContext, useReducer } from "react";
import { CommentsContext } from "./CommentsForPostPage";

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

    return (
        <div style={context.toggled? { backgroundColor: "red"} : {backgroundColor: "white"}}>
            <h5>{comment.name}</h5>
            <p>{comment.body}</p>
            <input type="checkbox" onClick={clickToggle}></input>
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