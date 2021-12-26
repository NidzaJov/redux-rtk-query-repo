import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPhotoQuery } from '../api/apiSlice';

import { ImageSlider } from './ImageSlider';

import  styles  from './SinglePicturePage.module.css'

export const SinglePicturePage = () => {
    const { pictureId } = useParams();
    const {data, isFetching } = useGetPhotoQuery(pictureId);
    const [photosIds, setPhotosIds] = useState([])

    const getNextId = (pictureId) => {
        if (photosIds) {
                const index = photosIds.indexOf(Number(pictureId))
            if (index === photosIds.length - 1) {
                return photosIds[0]
            } else {
                return photosIds[index + 1]
            }
        }
        
    }

    const getPreviousId = (pictureId) => {
        if (photosIds) {
            const index = photosIds.indexOf(Number(pictureId))
            if (index === 0) {
                return photosIds[photosIds.length - 1]
            } else {
                return photosIds[index -1]
            }
        }
    }
 
    return (
        isFetching? <div>Image loading...</div>
        : <div className={styles.image_container}>
            <div className={styles.numbertext}>{data.entities[pictureId].id}</div>
            <img src={data.entities[pictureId].url} alt="solo-entity" className={styles.picture}></img>
            <Link className={styles.prev} to={`/photos/${getPreviousId(pictureId)}`}>&#10094;</Link>
            <Link className={styles.next} to={`/photos/${getNextId(pictureId)}`}>&#10095;</Link>
            <ImageSlider passPhotosIds={setPhotosIds} albumId={data.entities[pictureId].albumId} pictureId={pictureId}></ImageSlider>
          </div>

    )

}