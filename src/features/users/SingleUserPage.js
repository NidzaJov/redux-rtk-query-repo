import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'

import { selectUserById } from '../api/apiSlice';
import { useGetPostsQuery } from '../api/apiSlice';

export const SingleUserPage = () => {
    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, userId))
    
    const selectPostsForUser = useMemo(() => {
        return createSelector(
            state => state,
            (state, userId) => userId,
            (state, userId) => {
                if (state.isSuccess) {
                    const result = Object.keys(state.data.entities).reduce((acc, key, i) => {
                        if (state.data.entities[key].userId == userId) {
                            acc.posts.push(state.data.entities[key])
                        } 
                        return acc;
                    }, {posts: []});
                    return result.posts;
                }
            }
        )
    }, [])

    const { postsForUser } = useGetPostsQuery(undefined, {
        selectFromResult: (result) => ({
            postsForUser: selectPostsForUser(result, userId)
        }),
    })
    
    
    const postsTitles = postsForUser.map((post) => (
        <li key={post.id} className="todo-li">{post.title}</li>
    ))

    let content = (
            <article className='user-article'>
                <h2>{user.name}</h2>
                <div>
                    <div className="user-data-div">
                        <span>E-mail: {user.email}</span>
                        <span>Adress: {user.address.street} {user.address.suite}, {user.address.city}</span>
                        <span>Phone: {user.phone}</span>
                        <span>Website: {user.website}</span>
                        <span>Company: {user.company.name}</span>
                    </div>
                    <div>
                        <Link to={`/editUser/${user.id}`} className="button">Edit user</Link>
                    </div>
                    
                </div>
                
            </article>
        )
    

    return (
        <section className="user-page-section">
            {content}
            <ul>{postsTitles}</ul>
        </section>
    )
}
