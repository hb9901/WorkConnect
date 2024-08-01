'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { SearchUsersProvider } from './_provider/SearchUsersProvider';

const AddChatLayout = ({ children }: StrictPropsWithChildren) => {
  return <SearchUsersProvider>{children}</SearchUsersProvider>;
};

export default AddChatLayout;
