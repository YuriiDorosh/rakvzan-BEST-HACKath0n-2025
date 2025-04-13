import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi, baseQueryWithReauth } from "../../app/baseQuery";
import { unpackPrams } from "../../utils/unpackPrams";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getList: builder.query({
        query: (body) =>({
             url: `/establishments/comments/list?${unpackPrams(body)}`,
             method: 'GET',
        }),
      }),
    }),
  });

  export const { useLazyGetListQuery } = userApi