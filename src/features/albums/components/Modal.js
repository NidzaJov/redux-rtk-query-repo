import { forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind'
import styles from '../SingleAlbumPage.module.css';
import { returnSequenceFromArray } from '../helpers/returnSequenceFromArray';


export const Modal = forwardRef(({ photoId, photos}, ref) => {
    
    let cx = classNames.bind(styles);
    const [chosenPhotoId, setChosenPhotoId] = useState(photos.ids[0]);
    useEffect(() => {
        if (photoId) {
            setChosenPhotoId(photoId);
        }
    }, [photoId])

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
        if (photoId === photos.ids[0]) {
            setChosenPhotoId(photos.ids[photos.ids.length -1])
        } else {
            setChosenPhotoId(photos.ids[photos.ids.indexOf(photoId) - 1])
        }
    }

    let elementIndex, sliderImagesIds;
    elementIndex = photos.ids.indexOf(chosenPhotoId); 
    sliderImagesIds = returnSequenceFromArray(elementIndex, photos.ids, 4);

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
                    <img src={photos.entities[chosenPhotoId].url} alt='bigimage' style={{ maxWidth:"600px", height: "auto"}}></img>
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