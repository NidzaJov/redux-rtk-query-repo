import { Link, useParams } from 'react-router-dom';
import { useGetUserQuery } from '../api/apiSlice';

export const SingleUserPage = () => {
    const { userId } = useParams()

    const { data: user, isFetching, isSuccess } = useGetUserQuery(userId);

    let content;
    if (isFetching) {
        content = <span>Loading...</span>
    } else if (isSuccess) {
        content = (
            <article className='user-article'>
                <h2>{user.name}</h2>
                <div>
                    <span>E-mail: {user.email}</span>
                    <p>
                        Adress:
                        <span>{user.address.street} {user.address.suite}, {user.address.city}</span>
                    </p>
                    <span>Phone: {user.phone}</span>
                    <span>Website: {user.website}</span>
                    <p>
                        Company:
                        <span>{user.company.name}</span>
                    </p>
                </div>
            </article>
        )
    }

    return <section>{content}</section>
}
