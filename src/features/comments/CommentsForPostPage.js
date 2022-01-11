import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useGetCommentsQuery } from '../api/apiSlice';
import { CommentsList } from './CommentsList';

export const CommentsContext = createContext();

export const CommentsForPostPage = () => {
    const { postId } = useParams();
    const { data, isFetching } = useGetCommentsQuery(postId);
        
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