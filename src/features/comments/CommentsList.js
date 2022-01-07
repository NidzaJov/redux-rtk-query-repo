import { useContext, createContext } from "react";
import { CommentsContext } from "./CommentsForPostPage";

export const commentContext = createContext();

const Comment = () => {
    const comment = useContext(commentContext);

    return (
        <div>
            <h5>{comment.name}</h5>
            <p>{comment.body}</p>
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