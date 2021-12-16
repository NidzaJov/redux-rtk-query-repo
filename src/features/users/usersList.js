import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetUsersQuery, selectAllUsers } from '../users/usersSlice';
import { AddNewUserForm } from './AddNewUserForm';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

let UserArticle = ({ user }) => {
    return(
        <article className='user-article'> 
            <span>{user.name}</span>
            <Link to={`/users/${user.id}`}>View user</Link>
        </article>
    )
}

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

    const users = useSelector((state) => selectAllUsers(state))

    const sortedUsers = useMemo(() => {
        const sortedUsers = users.slice();
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        return sortedUsers
    }, [users])
    

    let content;

        const renderedUsers = sortedUsers.map(user => <UserArticle key={user.id} user={user} ></UserArticle>)
        const containerClassname = classnames('users-container')
        content = <div className={containerClassname}>{renderedUsers}</div>

    return (
        <div>
            <section className="users-list">
                <h2>Users</h2>
                {content}
            </section>
            <AddNewUserForm />
        </div>
        
    )
}