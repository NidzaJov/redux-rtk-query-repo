import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            providedTags: ['User']
        }),

        getUser: builder.query({
            query: (userId) => `/users/${userId}`
        }),

        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: initialUser
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { 
    useGetUsersQuery, 
    useGetUserQuery,
    useAddNewUserMutation
} = apiSlice