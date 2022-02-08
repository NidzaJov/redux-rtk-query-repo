import { useState, useRef, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPhotosQuery } from "../api/apiSlice";
import { CircularProgress, Box } from "@mui/material";
import { Modal } from './components/Modal'
import { ActiveButtonContext } from "../../views/MainLayout";

import  styles  from "./SingleAlbumPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"

export const SingleAlbumPage = () => {
    const setActiveButton = useContext(ActiveButtonContext);
    useEffect(() => {
        setActiveButton('users');
    }, [setActiveButton])

    const { albumId } = useParams();

    const { data: photos, isFetching } = useGetPhotosQuery(albumId);

    const [photoId, setPhotoId] = useState()
    const modalComponent = useRef()
    const showModal = (id) => {
        setPhotoId(id);
        modalComponent.current.style.display = "block";
    }

    return (
        isFetching?  (
            <div>
                <Box sx={{ display: "flex"}}>
                    <CircularProgress />
                </Box>
            </div>
        )
        :<div className={styles.album_page}>
            <div className={styles.social_bar}>
                <a href='https://facebook.com/' className={styles.facebook}><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
                <a href='https://twitter.com/' className={styles.twitter}><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
                <a href='https://www.google.com/' className={styles.google}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></a>
                <a href='https://www.linkedin.com/' className={styles.linkedin}><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                <a href='https://www.youtube.com/' className={styles.youtube}><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></a>
            </div>
            <div className={styles.images_container}>
                {photos.ids.map(id => <div key={id} className={styles.image_container}>
                    <div className={styles.image_div}>
                        <Link to={`/photos/${id}`}>
                            <img src={photos.entities[id].url} alt="jspc" style={{ height: "70px", width: "70px"  }}></img>
                        </Link>
                    </div>
                    <div className={styles.image_title_div}>
                        <button onClick={() => showModal(id)}>{photos.entities[id].title}</button>
                    </div>
                </div>)}
            </div>
            <Modal photos={photos} photoId={photoId}  ref={modalComponent}></Modal>
        </div>
    )
}

