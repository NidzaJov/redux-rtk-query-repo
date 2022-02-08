import { useMemo, useState, useRef, useContext, useEffect } from 'react';
import { selectAllUsers } from '../../api/apiSlice';
import { AddNewUserForm } from '../components/AddNewUserForm';
import { useSelector } from 'react-redux';
import styles from './UsersList.module.css';
import { UsersListContent } from '../components/UsersListContent';
import { sortUsersByName } from '../helpers/sortUsersByName';
import { ActiveButtonContext } from '../../../views/MainLayout';

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

    const setActiveButton = useContext(ActiveButtonContext);
    useEffect(() => {
        setActiveButton('users');
    }, [setActiveButton])

    const users = useSelector((state) => selectAllUsers(state));
    const sortedUsers = useMemo(() => {
        return sortUsersByName(users)
    }, [users])

    const usersListElement = useRef();
    const [displayed, setDisplayed] = useState(false);
    const [rightSided, setRightSided] = useState(false)
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