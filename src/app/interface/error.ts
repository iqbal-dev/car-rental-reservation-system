export type TErrorSource = {
  path: string | number;
  message: string;
};

export type TErrorSources = TErrorSource | TErrorSource[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
