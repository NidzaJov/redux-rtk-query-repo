import { useParams, Link } from "react-router-dom";
import { useGetPhotosQuery } from "../api/apiSlice";

import  styles  from "./SingleAlbumPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"

export const SingleAlbumPage = () => {
    const { albumId } = useParams();

    const { data: photos, isFetching } = useGetPhotosQuery(albumId)

    return (
        isFetching?  <div>Pictures loading...</div>
        :<div className={styles.album_page}>
            <div className={styles.social_bar}>
                <a href='#' className={styles.facebook}><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
                <a href='#' className={styles.twitter}><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
                <a href='#' className={styles.google}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></a>
                <a href='#' className={styles.linkedin}><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                <a href='#' className={styles.youtube}><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></a>
            </div>
            <div className={styles.images_container}>
                {photos.ids.map(id => <div key={id} className={styles.image_container}>
                    <div className={styles.image_div}>
                        <Link to={`/photos/${id}`}>
                            <img src={photos.entities[id].url} alt="jspc" style={{ height: "70px", width: "70px"  }}></img>
                        </Link>
                    </div>
                    <div className={styles.image_title_div}>
                    <   span>{photos.entities[id].title}</span>
                    </div>
            
                </div>)}
            </div>
        </div>
    )
}