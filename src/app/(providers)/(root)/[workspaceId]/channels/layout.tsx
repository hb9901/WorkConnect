import { StrictPropsWithChildren } from '@/types/common';

const ChannelListLayout = ({ list, children }: StrictPropsWithChildren<{ list: React.ReactNode }>) => {
  return (
    <div className="lg:pl-[87px] lg:flex">
      <div className="w-full lg:max-w-[300px] lg:max-h-dvh lg:overflow-y-scroll lg:flex-shrink-0 scroll-container">
        {list}
      </div>
      <div className="lg:w-[calc(100%-300px)]">{children}</div>
    </div>
  );
};

export default ChannelListLayout;
