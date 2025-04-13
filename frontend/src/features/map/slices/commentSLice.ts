import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi, baseQueryWithReauth } from "../../../app/baseQuery";
import { unpackPrams } from "../../../utils/unpackPrams";

export const mapApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postComment: builder.mutation({
        query: (body) =>
          {
            const formData = new FormData();
            body.photos.forEach((file: File) => {
              formData.append('images', file);
            });
            formData.append('payload', JSON.stringify(body.payload))
            return {
              url: `/establishments/${body.id}/comments`,
              method: 'POST',
              body: formData,
            };
          },
      }),
    }),
  });

  export const { usePostCommentMutation } = mapApi