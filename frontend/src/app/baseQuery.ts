import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
// TODO: Set types
  const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // Виконуємо початковий запит
    let result = await baseQuery(args, api, extraOptions);
  
    // Якщо отримали 401 – спробуємо виконати refresh
    if (result.error && result.error.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // Виконуємо запит на endpoint /refresh
        const refreshResult = await baseQuery(
          {
            url: '/refresh',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
            //@ts-ignore
          localStorage.setItem('token', refreshResult.data.token);
          //@ts-ignore
          if (refreshResult.data.refreshToken) {
            //@ts-ignore
            localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
          }
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
    }
    return result;
  };

  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/login',
          method: 'POST',
          body: credentials,
        }),
      }),
    }),
  });