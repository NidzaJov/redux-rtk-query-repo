import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            providedTags: (result = [], error, arg) => [
                'User',
                ...result.map(({ id }) => ({ type: 'User', id}))
            ]
        }),

        getUser: builder.query({
            query: (userId) => `/users/${userId}`,
            providedTags: (result, error, arg) => [{ type: 'User', id: arg}]
        }),

        getTodos: builder.query({
            query: () => '/todos'
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
            query: user => ({
                url: `/users/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: (result, error, arg) => [{type: 'User', id: arg.id}]
        })
    })
})

export const { 
    useGetUsersQuery, 
    useGetUserQuery,
    useGetTodosQuery,
    useAddNewUserMutation,
    useEditUserMutation
} = apiSlice