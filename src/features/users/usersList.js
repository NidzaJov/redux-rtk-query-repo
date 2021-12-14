import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../api/apiSlice';
import { AddNewUserForm } from './AddNewUserForm';
import classnames from 'classnames';

let UserArticle = ({ user }) => {
    return(
        <article className='user-article'> 
            <span>{user.name}</span>
            <Link to={`/users/${user.id}`}>View user</Link>
        </article>
    )
}

export const UsersList = () => {
    const {
        data: users = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUsersQuery();

    const sortedUsers = useMemo(() => {
        const sortedUsers = users.slice();
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        return sortedUsers
    }, [users])
    

    let content;

    if (isLoading) {
        content = <span>Loading...</span>
    } else if (isSuccess) {
        const renderedUsers = sortedUsers.map(user => <UserArticle key={user.id} user={user} ></UserArticle>)
        const containerClassname = classnames('users-container', {disabled: isFetching})
        content = <div className={containerClassname}>{renderedUsers}</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }


    return (
        <div>
            <section className="users-list">
                <h2>Users</h2>
                <button onClick={refetch}>Refresh users</button>
                {content}
            </section>
            <AddNewUserForm />
        </div>
        
    )
}