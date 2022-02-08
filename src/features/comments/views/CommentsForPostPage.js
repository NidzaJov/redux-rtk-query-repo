import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useGetCommentsQuery } from '../../api/apiSlice';
import { CommentsList } from '../components/CommentsList';
import { CircularProgress, Box, Snackbar } from '@mui/material';
import { useActiveButtonEffect } from '../../../customHooks/useActiveButtonEffect';

export const CommentsContext = createContext();

export const CommentsForPostPage = () => {
    useActiveButtonEffect('apendix');

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