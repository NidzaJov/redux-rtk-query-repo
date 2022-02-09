import { useContext, createContext, useState } from "react";
import { CommentsContext } from "../views/CommentsForPostPage";
import { Comment } from './Comment'
import { useTimeout } from "../customHooks/useTimeout";
import { useUpdateEffect } from "../customHooks/useUpdateEffect";
import { useArray } from "../customHooks/useArray";

export const commentContext = createContext();

export const CommentsList = () => {
    const data = useContext(CommentsContext)
    const [count, setCount] = useState(0);
    const { clear, reset } = useTimeout(() => setCount(count => count -1 ), 1000)
    const [value, setValue] = useState(10);
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