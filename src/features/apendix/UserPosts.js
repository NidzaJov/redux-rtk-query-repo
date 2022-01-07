import { apiSlice, commentsAdapter, commentsInitialState } from '../api/apiSlice';
import { Link } from 'react-router-dom'
import styles from './ApendixPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo, useEffect } from 'react';

const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const result = dispatch(apiSlice.endpoints.getComments.initiate(postId));
        result.unsubscribe()
    }, [postId])
    console.log(postId);
    const selectCommentsResult = useMemo(() => apiSlice.endpoints.getComments.select(postId),
    [postId]);
    console.log(selectCommentsResult)
    const selectCommentsData = createSelector(
        selectCommentsResult,
        (commentsResult) => commentsResult.data
    )
    const commentsSelectors = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? commentsInitialState);
    console.log(commentsSelectors);

    console.log(useSelector(commentsSelectors.selectTotal))
    //setTotalComments(useSelector(commentsSelectors.selectTotal));
    const totalComments = useSelector(commentsSelectors.selectTotal);
    
     

    return (
            <div><Link to={`/posts/${postId}/comments`}>Comments({totalComments})</Link></div>
    )
}

export const UserPosts = ( { userId } ) => {
    const { postsOfUser } = apiSlice.useGetPostsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            postsOfUser: Object.keys(data.entities).reduce((acc, key, i) => {
                if (data.entities[key].userId === Number(userId)) {
                    acc.push(data.entities[key])
                }
                return acc;
            }, [])
        }),
    })

    

    return (
        <div className={styles.posts}>
            {postsOfUser.map(post => <div className={styles.post} key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <Comments postId={post.id}/>
                </div>)}
        </div>
    )
}