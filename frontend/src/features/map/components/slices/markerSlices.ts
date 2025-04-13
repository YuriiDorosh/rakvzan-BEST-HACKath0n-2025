import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi, baseQueryWithReauth } from "../../../../app/baseQuery";
import { unpackPrams } from "../../../../utils/unpackPrams";

export const markerSlices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postMarker: builder.mutation({
        query: (body) =>({
          url: `/establishments/`,
          method: 'POST',
          body: body,
        }),
      }),
      postPhotos: builder.mutation({
        query: (body) => {
          const formData = new FormData();
          body.photos.forEach((file: File) => {
            formData.append('photos', file);
          });
          return {
            url: `/establishments/${body.id}/photos/upload`,
            method: 'POST',
            body: formData,
          };
        },
      }),
  }),
});

  export const { usePostMarkerMutation, usePostPhotosMutation } = markerSlices