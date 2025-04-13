import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi, baseQueryWithReauth } from "../../../app/baseQuery";
import { unpackPrams } from "../../../utils/unpackPrams";

export const markerSlices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postMarker: builder.mutation({
        query: (body) =>({
          url: `/establishments/`,
          method: 'POST',
          body: {
            ...body,
            phone: 0,
            contact_email: '',
            website: '',
            open_at_on_monday_to_friday: 0,
            open_at_on_saturday: 0,
            description: '',
            has_ramp: true,
            has_parking: true,
            has_bathroom: true,
            has_elevator: true,
            has_tactical_floor: true,
            has_signage: true,
            has_braille: true,
            has_audio: true,
            has_guide: true,
            has_sign_language: true,
            has_veterans_discounts: true,
            has_wifi: true
          },
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