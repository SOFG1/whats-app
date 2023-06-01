import { emptyApi } from ".";

export interface IUserLoginPayload {
  instanceId: string;
  instanceToken: string;
}

export type UserLoginRes = {
  stateInstance: string;
};

export const userApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getInstanceState: builder.query<any, IUserLoginPayload>({
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
