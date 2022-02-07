export const filterPostsByUserId = (entities, userId) => {
    return Object.keys(entities).reduce((acc, key, i) => {
        if (entities[key].userId === Number(userId)) {
            acc.posts.push(entities[key])
        } 
        return acc;
    }, {posts: []});
}