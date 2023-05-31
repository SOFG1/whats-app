import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";

const hostUrl = "https://api.green-api.com/";

//RTK query api
const baseQuery = fetchBaseQuery({
  baseUrl: `${hostUrl}/`,
});

export const emptyApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
