import React, { useMemo, useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import styles from './SingleUserPage.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { UserAlbumsList } from '../components/UserAlbumsList';
import { DropdownWithMap } from '../components/DropdownWithMap';
import { filterPostsByUserId } from '../helpers/filterPostsByUserId';
import { ActiveButtonContext } from '../../../views/MainLayout';

import { useGetUserQuery, useGetPostsQuery, useGetAlbumsQuery } from '../../api/apiSlice';

export const SingleUserPage = () => {
    const setActiveButton = useContext(ActiveButtonContext);
    useEffect(() => {
        setActiveButton('users');
    }, [setActiveButton])

    const { userId } = useParams();
    //const user = useSelector(state => selectUserById(state, userId));
    const { data, isSuccess: userFetchingSuccess } = useGetUserQuery(userId);

    const selectPostsForUser = useMemo(() => {
        return createSelector(
            result => result,
            (result, userId) => userId,
            (result, userId) => {
                if (result.isSuccess) {
                    const filteredPostsAccumulator = filterPostsByUserId(result.data.entities, userId);
                    return filteredPostsAccumulator.posts;
                } 
            }
        )
    }, [])

    const { postsForUser = [] } = useGetPostsQuery(undefined, {
        selectFromResult: (result) => ({
            postsForUser: selectPostsForUser(result, userId)
        })
    })

    const postsTitles = postsForUser.map((post) => (
        <li key={post.id} className={styles.todo_li}>{post.title}</li>
    ))

    const [map, setMap] = useState()
    const OnMouseEnterHandle = () => {
        if(map) {
            map.invalidateSize();
        }
    }

    let userContent;
    if (userFetchingSuccess) {
        const user = data.entities[data.ids];
        userContent = (
            <article className={styles.user_article}>
                <h2>{user.name}</h2>
                <div>
                    <div className={styles.user_data_div}>
                        <span>E-mail: {user.email}</span>
                        <span className={styles.dropable_address_span} onMouseEnter={OnMouseEnterHandle}>
                        Adress: {user.address.street} {user.address.suite}, {user.address.city}
                            <DropdownWithMap user={user} setMap={setMap}/>
                        </span>
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
    } else {
        userContent = (
            <div>
                <Box sx={{ display: "flex"}}>
                    <CircularProgress />
                </Box>
            </div>
        ) 
    }
         
    const { data: albumsData, isFetching, isSuccess, isError, error } = useGetAlbumsQuery(userId);
    let albumsContent;

    if (isFetching) {
        albumsContent = (
            <div>
                <Box sx={{ display: "flex"}}>
                    <CircularProgress />
                </Box>                   
            </div>                
        )
    } else if (isSuccess) {
        albumsContent = <UserAlbumsList albums={albumsData}></UserAlbumsList>
    } else if (isError) {
        albumsContent = (
            <div>
                <Snackbar message={error.toString()} />
            </div>
        )
    }
    
    return (
        <section className={styles.user_page_section}>
            {userContent}
            <div className={styles.user_page_contents}>
                <ul className={styles.user_todos_list}>
                    <h3>Posts</h3>
                    {postsTitles}
                </ul>
                {albumsContent}
            </div>
        </section>
    )
}
