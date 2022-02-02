import classnames from "classnames";
import styles from '../views/UsersList.module.css';
import { UserArticle } from "./UserArticle";

export const UsersListContent = ({ sortedUsers }) => {
    const renderedUsers = sortedUsers.map(user => <UserArticle key={user.id} user={user} ></UserArticle>)
    const containerClassname = classnames(styles.users_container)

    return (
        <div className={containerClassname}>
            {renderedUsers}
        </div>
    )
}