import { useMemo, useState, useRef } from 'react';
import { selectAllUsers } from '../../api/apiSlice';
import { AddNewUserForm } from '../components/AddNewUserForm';
import { useSelector } from 'react-redux';
import styles from './UsersList.module.css';
import { UsersListContent } from '../components/UsersListContent';

export const UsersList = () => {
    /*
    const {
        data: users = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUsersQuery();
    */

    const users = useSelector((state) => selectAllUsers(state));
    console.log(users);

    const sortedUsers = useMemo(() => {
        const sortedUsers = users.slice();
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        return sortedUsers
    }, [users])
    

    const [displayed, setDisplayed] = useState(false);
    const [rightSided, setRightSided] = useState(false)

    const usersListElement = useRef();

    const displayAddUser = () => {
        usersListElement.current.className=styles.users_list_right_sided;
        setRightSided(true);
        setDisplayed(true);
    }

    return (
        <div className={styles.users_view}>
            <section ref={usersListElement} className={rightSided? styles.users_list_right_sided : styles.users_list}>
                <h2>Users</h2>
                <button className={styles.add_user_button} onClick={displayAddUser}>Add new user</button>
                <UsersListContent sortedUsers={sortedUsers} />
            </section>
            <AddNewUserForm displayed={displayed} setDisplayed={setDisplayed} setRightSided={setRightSided}/>
        </div> 
    )
}