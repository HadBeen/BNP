import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import webconfig from '../webconfig.json';

const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: webconfig.BackUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    /* ******************************* User ******************************* */
    /* Sign In */
    signIn: builder.mutation({
      query: ({ body }) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
    /* Sign Up / Register */
    signUp: builder.mutation({
      query: ({ body }) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    /* Log out */
    logOut: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    /* Get User Data */
    getUserData: builder.mutation({
      query: () => ({ url: '/', method: 'GET' }),
    }),
    /* Edit User Data */
    editUser: builder.mutation({
      query: (body) => ({ url: '/user', method: 'PUT', body }),
    }),
    // pending
    getDemande: builder.mutation({
      query: () => ({ url: '/demande', method: 'GET' }),
    }),
    // preverified
    getDemandePreVerfied: builder.mutation({
      query: () => ({ url: '/preverfied', method: 'GET' }),
    }),
  }),
});

export const {
  // User
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
  useGetUserDataMutation,
  useEditUserMutation,
  useGetDemandeMutation,
  useGetDemandePreVerfiedMutation
} = Api;
export default Api;
