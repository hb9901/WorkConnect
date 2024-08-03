import { getCookie, setCookie } from './cookieUtils';

export const getWorkspaceUserId = () => {
  return getCookie('workspaceUserId');
};

export const getWorkspaceId = () => {
  return getCookie('workspaceId');
};

export const setWorkspaceUserId = (workspaceUserId: string) => {
  return setCookie('workspaceUserId', workspaceUserId, 365);
};

export const setWorkspaceId = (workspaceId: number) => {
  return setCookie('workspaceId', String(workspaceId), 365);
};
