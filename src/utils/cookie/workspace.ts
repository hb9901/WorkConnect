import { getCookie, setCookie } from './clientUtils';

export const getWorkspaceUserIdCookie = () => {
  return getCookie('workspaceUserId');
};

export const getWorkspaceIdCookie = () => {
  return getCookie('workspaceId');
};

export const getUserIdCookie = () => {
  return getCookie('userId');
};

export const setWorkspaceUserIdCookie = (workspaceUserId: string) => {
  return setCookie('workspaceUserId', workspaceUserId, 365);
};

export const setWorkspaceIdCookie = (workspaceId: number) => {
  return setCookie('workspaceId', String(workspaceId), 365);
};

export const setUserIdCookie = (userId: string) => {
  return setCookie('userId', userId, 365);
};
