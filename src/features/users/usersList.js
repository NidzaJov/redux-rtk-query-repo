import { useGetUsersQuery } from '../api/apiSlice';


export const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    let content;

    if (isLoading) {
        content = <span>Loading...</span>
    } else if (isSuccess) {
        content = users.map(user => <div key={user.id}>{user.name}</div>)
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }


    return (
        <section>
            <h2>Users</h2>
            {content}
        </section>
    )
}