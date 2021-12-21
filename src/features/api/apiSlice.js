import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const postsAdadpter = createEntityAdapter();
const initialState = postsAdadpter.getInitialState();

const usersAdapter = createEntityAdapter();
const initialUsersState = usersAdapter.getInitialState();

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                return postsAdadpter.setAll(initialState, responseData)
            }
        }),

        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 3600,
            transformResponse: responseData => {
                return usersAdapter.setAll(initialUsersState, responseData)
            },
            providedTags: (result = [], error, arg) => [
                'User',
                ...result.map(({ id }) => ({ type: 'User', id}))
            ]
        }),
        getUser: builder.query({
            query: (userId) => `/users/${userId}`,
            transformResponse: responseData => {
                return usersAdapter.setOne(initialUsersState, responseData)
            },
            providedTags: (result, error, arg) => [{ type: 'User', id: arg}]
        }),

        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: initialUser
            }),
            invalidatesTags: ['User']
        }),

        editUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: (result, error, arg) => [{type: 'User', id: arg.id}]
        })

    })
})

export const selectUsersResult = apiSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialUsersState);


export const { 
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useGetPostsQuery,
    useEditUserMutation
} = apiSlice