export type StrictPropsWithChildren<P = unknown> = P & {
  children: React.ReactNode;
};

export type APIResponse<T> = {
  data: T;
  statusCode: number;
  status: boolean;
  message: string;
  error?: any;
};
