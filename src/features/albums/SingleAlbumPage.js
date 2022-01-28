import { useState, useRef, forwardRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPhotosQuery } from "../api/apiSlice";
import  classNames  from 'classnames/bind'

import  styles  from "./SingleAlbumPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"

export const SingleAlbumPage = () => {
    const { albumId } = useParams();

    const { data: photos, isFetching } = useGetPhotosQuery(albumId);

    const [photoId, setPhotoId] = useState()
    const modalComponent = useRef()
    const showModal = (id) => {
        setPhotoId(id);
        modalComponent.current.style.display = "block";
    }

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
                    <span><a href="#" onClick={() => showModal(id)}>{photos.entities[id].title}</a></span>
                    </div>
            
                </div>)}
            </div>
            <Modal photos={photos} photoId={photoId}  ref={modalComponent}></Modal>
            
        </div>
    )
}

export const Modal = forwardRef(({ photoId, photos}, ref) => {
    
    console.log(photoId, photos);
    let cx = classNames.bind(styles);
    const [chosenPhotoId, setChosenPhotoId] = useState(photos.ids[0]);
    useEffect(() => {
        if (photoId) {
            setChosenPhotoId(photoId);
        }
    }, [photoId])
    let elementIndex, sliderImagesIds;

    const closeModal = () => {
        ref.current.style.display = "none";
    }

    const goToNextPhoto = (photoId) => {
        if (photoId === photos.ids[photos.ids.length -1]) {
            setChosenPhotoId(photos.ids[0])
        } else {
            setChosenPhotoId(photos.ids[photos.ids.indexOf(photoId) + 1])
        }
    }

    const goToPreviousPhoto = (photoId) => {
        console.log('PreviousId',photoId)
        if (photoId === photos.ids[0]) {
            setChosenPhotoId(photos.ids[photos.ids.length -1])
        } else {
            setChosenPhotoId(photos.ids[photos.ids.indexOf(photoId) - 1])
        }
    }

    elementIndex = photos.ids.indexOf(chosenPhotoId) 
    if (elementIndex > (photos.ids.length - 4)) {
        sliderImagesIds = photos.ids.slice(elementIndex, photos.ids.length).concat(photos.ids.slice(0, (4 - (photos.ids.length - elementIndex))));
    } else {
        sliderImagesIds = photos.ids.slice(elementIndex, elementIndex + 4)
    } 
    console.log(elementIndex);
    console.log(photos.ids.length -4);
    console.log(photos.ids.slice(elementIndex, elementIndex + 4))
    console.log(sliderImagesIds);

    return (
        <div ref={ref} className={styles.modal}>
            <span className={ cx({
                    [styles.close_button]: true,
                    [styles.cursor]: true
                })}
                onClick={closeModal}
            >&times;</span>
            <div className={styles.modal_content}>
                <div className={styles.slide}>
                    <div className={styles.numbertext}>{photos.ids.indexOf(chosenPhotoId) + 1 +"/"+ photos.ids.length}</div>
                    <img src={photos.entities[chosenPhotoId].url} alt='bigimage' style={{ width:"600px"}}></img>
                </div>
                <button className={styles.prev} onClick={() => goToPreviousPhoto(chosenPhotoId)}>&#10094;</button>
                <button className={styles.next}onClick={() => goToNextPhoto(chosenPhotoId)}>&#10095;</button>
                <div className={styles.caption_container}>
                    <p id={styles.caption}>{photoId? photos.entities[chosenPhotoId].title : "caption"}</p>
                </div>
                <div className={styles.column}>
                    <div>
                        <img src={photos.entities[sliderImagesIds[0]].url} alt={'somepicture'} className={
                            cx({
                                    [styles.demo]: true,
                                    [styles.cursor]: true
                            })
                        } style={{ height:"100px", width:"100px" }} onClick={() => setChosenPhotoId(sliderImagesIds[0])}></img>
                        <img src={photos.entities[sliderImagesIds[1]].url} alt={'somepicture'} className={
                            cx({
                                [styles.demo]: true,
                                [styles.cursor]: true
                            })
                        } style={{ height: "100px", width:"100px" }} onClick={() => setChosenPhotoId(sliderImagesIds[1])}></img>
                        <img src={photos.entities[sliderImagesIds[2]].url} alt={'somepicture'} className={
                            cx({
                                [styles.demo]: true,
                                [styles.cursor]: true
                            })
                        } style={{ height: "100px", width: "100px" }} onClick={() => setChosenPhotoId(sliderImagesIds[2])}></img>
                        <img src={photos.entities[sliderImagesIds[3]].url} alt={'somepicture'} className={
                            cx({
                                [styles.demo]: true,
                                [styles.cursor]: true
                            })
                        } style={{ height: "100px", width: "100px" }} onClick={() => setChosenPhotoId(sliderImagesIds[3])}></img>
                    </div>
                </div>
            </div>
        </div>
    )
})