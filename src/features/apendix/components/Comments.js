import { apiSlice, commentsAdapter, commentsInitialState } from '../../api/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom'


export const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const result = dispatch(apiSlice.endpoints.getComments.initiate(postId));
        result.unsubscribe()
    }, [postId, dispatch])
    const selectCommentsResult = useMemo(() => apiSlice.endpoints.getComments.select(postId),
    [postId]);
    const selectCommentsData = createSelector(
        selectCommentsResult,
        (commentsResult) => commentsResult.data
    )
    const commentsSelectors = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? commentsInitialState);
    const totalComments = useSelector(commentsSelectors.selectTotal);
    
    return (
            <div>
                <Link to={`/posts/${postId}/comments`}>Comments({totalComments})</Link>
            </div>
    )
}