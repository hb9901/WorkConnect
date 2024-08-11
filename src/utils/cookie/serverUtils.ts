import { cookies } from 'next/headers';

export const getServerCookie = (name: string) => {
  return cookies().get(name)?.value;
};
