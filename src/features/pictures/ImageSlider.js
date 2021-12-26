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
        console.log(`pictureId: ${id} array: ${array}`)
        const length = array.length;
        console.log(length);
        console.log(typeof(id))
        const index = array.indexOf(Number(id));
        console.log(index);
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
            {console.log('data:', data)}
            {console.log(sliderFilter(pictureId, data.ids))}
            {sliderFilter(pictureId, data.ids).map(id => 
            <div key={id}>
                <img src={data.entities[id.toString()].url} alt="edc" className={styles.picture}></img>
            </div>)}
        </div>
    )
}