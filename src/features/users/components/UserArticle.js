import { Link } from "react-router-dom";
import styles from '../views/UsersList.module.css';

export const UserArticle = ({ user }) => {
    return(
        <article className={styles.userslist_article}> 
            <span>{user.name}</span>
            <Link to={`/users/${user.id}`}>View user</Link>
        </article>
    )
}