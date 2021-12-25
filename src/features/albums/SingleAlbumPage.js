import { useParams, Link } from "react-router-dom";
import { useGetPhotosQuery } from "../api/apiSlice";

import  styles  from "./SingleAlbumPage.module.css"

export const SingleAlbumPage = () => {
    console.log('Styles', styles)
    const { albumId } = useParams();

    const { data: photos, isFetching } = useGetPhotosQuery(albumId)

    
    return (
        isFetching?  <div>Pictures loading...</div>
        :<div className={styles.album_page}>
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