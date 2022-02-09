import { apiSlice } from '../../api/apiSlice';
import styles from '../ApendixPage.module.css';
import { Comments } from './Comments';
import { filterPostsByUserId } from '../../users/helpers/filterPostsByUserId'


export const UserPosts = ( { userId } ) => {
    const { postsOfUser } = apiSlice.useGetPostsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            postsOfUser: filterPostsByUserId(data.entities, userId)
        }),
    })
    
    return (
        <div className={styles.posts}>
            {
                postsOfUser.map(post => <div className={styles.post} key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                    <Comments postId={post.id}/>
                </div>)
            }
        </div>
    )
}