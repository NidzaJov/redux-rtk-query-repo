import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useGetCommentsQuery } from '../api/apiSlice';
import { CommentsList } from './CommentsList';

export const CommentsContext = createContext();

export const CommentsForPostPage = () => {
    const { postId } = useParams();
    console.log('postid;', postId);
    const { data, isFetching } = useGetCommentsQuery(postId);
    
    if(!isFetching) {
        console.log('Data:', data);
        
    }
        
    return (
        <div>
            {isFetching? <div>CommentsLoading...</div>
            : <CommentsContext.Provider value={data} >
                <CommentsList></CommentsList>
            </CommentsContext.Provider>
            }
        </div>
    )
}