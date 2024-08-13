import { StrictPropsWithChildren } from '@/types/common';

const ChannelListLayout = ({ list, children }: StrictPropsWithChildren<{ list: React.ReactNode }>) => {
  return (
    <>
      {list}
      {children}
    </>
  );
};

export default ChannelListLayout;
