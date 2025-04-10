import { baseApi } from "../../app/baseQuery";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      refresh: builder.mutation({
        query: () => {
          const refreshToken = localStorage.getItem('refreshToken');
          return {
            url: '/refresh',
            method: 'POST',
            body: { refreshToken },
          };
        },
      }),
    }),
});
  
export const { useLoginMutation, useRefreshMutation } = authApi;