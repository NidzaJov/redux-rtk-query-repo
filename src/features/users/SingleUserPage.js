import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faImages } from '@fortawesome/free-solid-svg-icons';
import styles from './SingleUserPage.module.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';


import { selectUserById } from '../api/apiSlice';
import { useGetPostsQuery, useGetAlbumsQuery } from '../api/apiSlice';

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
                        if (state.data.entities[key].userId === Number(userId)) {
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
        <li key={post.id} className={styles.todo_li}>{post.title}</li>
    ))

    const [map, setMap] = useState()
    const OnMouseEnterHandle = () => {
        if(map) {
            map.invalidateSize();
        }
    }

    const content = (
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
        
    const UserAlbumsList = ( {albums} ) => {
        return (
            <div className={styles.user_albums_div}>
                <h3 className={styles.albums_h3}>Albums <FontAwesomeIcon icon={faCaretDown} className={styles.caret_down}/></h3>
                <div className={styles.album_items}>
                    {albums.ids.map((id) => <div key={id} className={styles.album_item_div}>
                        <div className={styles.album_item_content}>
                            <div>
                                <span>{albums.entities[id].title}</span>
                            </div>
                            <Link to={`/albums/${id}`}><FontAwesomeIcon icon={faImages} className={styles.album_icon}/></Link>
                        </div>
                        </div>)}     
                    
                </div>
                
            </div>
        )
    }
    
    const { data: albumsData, isFetching } = useGetAlbumsQuery(userId);
    
    return (
        <section className={styles.user_page_section}>
            {content}
            <div className={styles.user_page_contents}>
                <ul className={styles.user_todos_list}>
                    <h3>Todos</h3>
                    {postsTitles}
                </ul>
                {isFetching ? <div>Albums loading ...</div>
                : <UserAlbumsList albums={albumsData}></UserAlbumsList>}
            </div>
        </section>
    )
}
