import { emptyApi } from ".";

type UserLoginPayload = {
  email: string;
  password: string;
};

type UserLoginRes = any;

export const userApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getInstanceState: builder.mutation<UserLoginRes, UserLoginPayload>({
        query: (body) => {
          return {
            url: "user/signin/",
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});


export const {
  useGetInstanceStateMutation
} = userApi;
