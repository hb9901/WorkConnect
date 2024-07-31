import type { ComponentProps } from 'react';

export type StrictPropsWithChildren<P = unknown> = P & {
  children: React.ReactNode;
};

export type ImagePropsType = ComponentProps<'img'>;

export type StrictNextImagePropsType = Omit<ImagePropsType, 'src' | 'width' | 'height' | 'alt'> &
  Required<Pick<ImagePropsType, 'src' | 'alt'>> & {
    width: number;
    height: number;
  };

export type APIResponse<T> = {
  data: T;
  statusCode: number;
  status: boolean;
  message: string;
  error?: any;
};
