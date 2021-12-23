import { useParams } from "react-router-dom";
import { useGetPhotosQuery } from "../api/apiSlice";

import styles from "./SingleAlbumPage.module.css"

export const SingleAlbumPage = () => {
    const { albumId } = useParams();

    const { data: photos, isFetching } = useGetPhotosQuery(albumId)

    
    return (
        isFetching?  <div>Pictures loading...</div>
        :<div className={styles.album_page}>
            {photos.ids.map(id => <div key={id} className="image-div">
                <div>
                    <img src={photos.entities[id].url} alt="jspc" style={{ height: "100px", width: "100px"  }}></img>
                </div>
            {photos.entities[id].title}
            </div>)}
        </div>
    )
}