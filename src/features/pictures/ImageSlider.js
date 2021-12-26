import { useEffect } from "react";
import { useGetPhotosQuery } from "../api/apiSlice";

import styles from './ImageSlider.module.css';

export const ImageSlider = ( {albumId, pictureId, passPhotosIds } ) => {
    const { data, isFetching } = useGetPhotosQuery(albumId)

    useEffect(() => {
        isFetching? passPhotosIds([])
        : passPhotosIds(data.ids)
    }, [data])

    const sliderFilter = (id, array,) => {
        const length = array.length;
        const index = array.indexOf(Number(id));
        if (index === 0) {
            return [array[length -1], array[0], array[1]]
        } else if (index === length - 1) {
            return [array[length - 2], array[length - 1], array[0]]
        } else {
            return [ array[index -1], array[index], array[index + 1]]
        }
    } 

    return (
        isFetching ? <div>Slider is loading...</div>
        : <div className={styles.slider}>
            {sliderFilter(pictureId, data.ids).map((id, idx) => 
            idx === 1 ?
            <div key={id} className={styles.picture_container}>
                <img src={data.entities[id.toString()].url} alt="edc" className={styles.picture + ' ' + styles.active}></img>
            </div> 
            :<div key={id} className={styles.picture_container}>
            <img src={data.entities[id.toString()].url} alt="edc" className={styles.picture}></img>
        </div>)}       
        </div>
    )
}