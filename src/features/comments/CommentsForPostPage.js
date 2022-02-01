import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useGetCommentsQuery } from '../api/apiSlice';
import { CommentsList } from './CommentsList';
import { CircularProgress, Box, Snackbar } from '@mui/material';

export const CommentsContext = createContext();

export const CommentsForPostPage = () => {
    const { postId } = useParams();
    const { data, isFetching, isSuccess, isError, error } = useGetCommentsQuery(postId);
    
    let content;

    if (isFetching) {
        content = <div>
            <Box sx={{ display: "flex"}}>
                <CircularProgress />
            </Box>
        </div>
    } else if (isSuccess) {
        content = <CommentsContext.Provider value={data} >
                    <CommentsList></CommentsList>
            </CommentsContext.Provider>
    } else if (isError) {
        content = <Snackbar message={error.toString()} />
    }

    return (
        <div>
            {content}
        </div>
    )
}