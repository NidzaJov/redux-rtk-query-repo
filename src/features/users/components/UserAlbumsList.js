import { Link } from 'react-router-dom';
import styles from '../views/SingleUserPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faImages } from '@fortawesome/free-solid-svg-icons';

export const UserAlbumsList = ( {albums} ) => {
    return (
        <div className={styles.user_albums_div}>
            <h3 className={styles.albums_h3}>Albums <FontAwesomeIcon icon={faCaretDown} className={styles.caret_down}/></h3>
            <div className={styles.album_items}>
                {albums.ids.map((id) => <div key={id} className={styles.album_item_div}>
                    <div className={styles.album_item_content}>
                        <div>
                            <span>{albums.entities[id].title}</span>
                        </div>
                        <Link to={`/albums/${id}`}><FontAwesomeIcon icon={faImages} className={styles.album_icon}/></Link>
                    </div>
                </div>)}     
            </div>
        </div>
    )
}