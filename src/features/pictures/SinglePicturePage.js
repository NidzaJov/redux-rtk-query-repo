import { useParams, Link } from 'react-router-dom';
import { useGetPhotoQuery } from '../api/apiSlice';

import  styles  from './SinglePicturePage.module.css'

export const SinglePicturePage = () => {
    const { pictureId } = useParams();
    
    const {data, isFetching } = useGetPhotoQuery(pictureId);

    return (
        isFetching? <div>Image loading...</div>
        : <div className={styles.image_container}>
            <img src={data.entities[pictureId].url} alt="solo-entity" className={styles.picture}></img>
            <Link className={styles.prev} to={`/images/${pictureId - 1}`}>&#10094;</Link>
            <Link className={styles.next} to={`/images/${pictureId + 1}`}>&#10095;</Link>
          </div>
    )

}