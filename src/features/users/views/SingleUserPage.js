import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import styles from './SingleUserPage.module.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { UserAlbumsList } from '../components/UserAlbumsList';

import { useGetUserQuery, useGetPostsQuery, useGetAlbumsQuery } from '../../api/apiSlice';

export const SingleUserPage = () => {
    const { userId } = useParams();
    //const user = useSelector(state => selectUserById(state, userId));
    const { data, isSuccess: userFetchingSuccess } = useGetUserQuery(userId);
    console.log(useGetUserQuery(userId).data);

    const selectPostsForUser = useMemo(() => {
        return createSelector(
            result => result,
            (result, userId) => userId,
            (result, userId) => {
                console.log(result)
                    if (result.isSuccess) {
                        const results = Object.keys(result.data.entities).reduce((acc, key, i) => {
                            if (result.data.entities[key].userId === Number(userId)) {
                                acc.posts.push(result.data.entities[key])
                            } 
                            return acc;
                        }, {posts: []});
                        return results.posts;
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

    let content;
    if (userFetchingSuccess) {
        const user = data.entities[data.ids];
        console.log(user);
        content = (
            <article className={styles.user_article}>
                <h2>{user.name}</h2>
                <div>
                    <div className={styles.user_data_div}>
                        <span>E-mail: {user.email}</span>
                        <span className={styles.dropable_address_span} onMouseEnter={OnMouseEnterHandle}>
                        Adress: {user.address.street} {user.address.suite}, {user.address.city}
                            <div className={styles.dropdown_address_content}>
                                <div>
                                    zipcode: {user.address.zipcode}
                                </div>
                                <div id={styles.map}>
                                    <MapContainer whenCreated={setMap} center={[/*user.address.geo.lat, user.address.geo.lng*/43.316872, 21.894501]} zoom={13} scrollWheelZoom={true}>
                                        <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                        <Marker position={[/*user.address.geo.lat, user.address.geo.lng*/43.316872, 21.894501]}>
                                            <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>
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
        content = <div>
        <Box sx={{ display: "flex"}}>
            <CircularProgress />
        </Box>
        </div>
    }
         
    const { data: albumsData, isFetching, isSuccess, isError, error } = useGetAlbumsQuery(userId);
    let albumsContent;

    if (isFetching) {
        albumsContent = <div>
                        <Box sx={{ display: "flex"}}>
                            <CircularProgress />
                        </Box>
                    </div>
    } else if (isSuccess) {
        albumsContent = <UserAlbumsList albums={albumsData}></UserAlbumsList>
    } else if (isError) {
        albumsContent = <div>
                    <Snackbar message={error.toString()} />
                </div>
    }
    
    return (
        <section className={styles.user_page_section}>
            {content}
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
