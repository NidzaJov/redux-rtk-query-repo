import { useMemo } from 'react';
import { useGetUsersQuery } from '../api/apiSlice';


export const UsersList = () => {
    const {
        data: users = [],
        isLoading,
        isSuccess,
        isError,
        error
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
        content = sortedUsers.map(user => <div key={user.id}>{user.name}</div>)
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }


    return (
        <section className="users-list">
            <h2>Users</h2>
            {content}
        </section>
    )
}