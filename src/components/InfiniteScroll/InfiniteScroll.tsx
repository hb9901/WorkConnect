import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  children,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  children: React.ReactNode;
}) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (!(inView && hasNextPage)) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div ref={ref} className="h-[20px]" />
    </>
  );
};

export default InfiniteScroll;
