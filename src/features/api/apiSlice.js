import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'https://jsonplaceholder.typicode.com'}),

    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users'
        }),

        getUser: builder.query({
            query: (userId) => `/users/${userId}`
        }),

        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: initialUser
            })
        })
    })
})

export const { 
    useGetUsersQuery, 
    useGetUserQuery,
    useAddNewUserMutation
} = apiSlice