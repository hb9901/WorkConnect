import { StrictPropsWithChildren } from '@/types/common';

const ChannelListLayout = ({ list, children }: StrictPropsWithChildren<{ list: React.ReactNode }>) => {
  return (
    <div className="lg:pl-[87px] lg:flex">
      <div className="lg:max-w-[300px] lg:max-h-dvh lg:overflow-y-auto">{list}</div>
      <div className="lg:flex-1">{children}</div>
    </div>
  );
};

export default ChannelListLayout;
