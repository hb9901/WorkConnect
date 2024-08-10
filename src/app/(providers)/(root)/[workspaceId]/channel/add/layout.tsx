'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { SearchUsersProvider } from './_provider/SearchUsersProvider';

const AddChatProviderLayout = ({ children }: StrictPropsWithChildren) => {
  return <SearchUsersProvider>{children}</SearchUsersProvider>;
};

export default AddChatProviderLayout;
