import React from 'react';

declare module "@mui/material/styles" {
  interface TypographyVariants {
    marker_title: React.CSSProperties;
    marker_sub_title: React.CSSProperties;
    marker_list_component: React.CSSProperties;
    detail_list_subtitle: React.CSSProperties;
    detail_list_accessability: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    marker_title?: React.CSSProperties;
    marker_sub_title?: React.CSSProperties;
    marker_list_component?: React.CSSProperties;
    detail_list_subtitle?: React.CSSProperties;
    detail_list_accessability?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    marker_title: true;
    marker_sub_title: true;
    marker_list_component: true;
    detail_list_subtitle: true;
    detail_list_accessability: true;
  }
}
