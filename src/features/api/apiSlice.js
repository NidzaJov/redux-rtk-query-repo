import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const postsAdadpter = createEntityAdapter();
const initialState = postsAdadpter.getInitialState();

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        

        getUser: builder.query({
            query: (userId) => `/users/${userId}`,
            providedTags: (result, error, arg) => [{ type: 'User', id: arg}]
        }),

        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                return postsAdadpter.setAll(initialState, responseData)
            }
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
    useGetUserQuery,
    useAddNewUserMutation,
    useGetPostsQuery,
    useEditUserMutation
} = apiSlice