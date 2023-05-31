import { emptyApi } from ".";

type UserLoginPayload = {
  instanceId: string;
  instanceToken: string;
};

type UserLoginRes = {
  stateInstance: string;
};

export const userApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getInstanceState: builder.query<any, UserLoginPayload>({
        query: ({ instanceId, instanceToken }) => {
          return {
            url: `waInstance${instanceId}/getStateInstance/${instanceToken}/`,
            method: "GET",
          };
        },
        transformResponse: (
          raw: UserLoginRes,
          req,
          { instanceId, instanceToken }
        ) => {
          return {
            instanceId,
            instanceToken,
            status: raw.stateInstance,
          };
        },
      }),
    };
  },
});

export const { useLazyGetInstanceStateQuery } = userApi;
