export interface ApiCallError {
  message: string;
}

export type ApiCall<ApiCallResponse = unknown, Params = unknown> = (
  params: Params,
) => Promise<[ApiCallError | null, ApiCallResponse | null]>;

