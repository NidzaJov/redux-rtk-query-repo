export const sortUsersByName = (users) => {
    const sortedUsers = users.slice();
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    return sortedUsers; 
}