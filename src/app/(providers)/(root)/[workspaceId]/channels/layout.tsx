'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { ResponseContainer, ResponseContent } from './_components/ResponseLayout';
import useIsPC from '@/hooks/useIsPc';

const ChannelListLayout = ({ list, children }: StrictPropsWithChildren<{ list: React.ReactNode }>) => {
  const isPC = useIsPC();

  return (
    <ResponseContainer>
      {list}
      <ResponseContent isFullWidth={!isPC}>{children}</ResponseContent>
    </ResponseContainer>
  );
};

export default ChannelListLayout;
