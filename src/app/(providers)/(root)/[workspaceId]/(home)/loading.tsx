import LoadingSpinner from '@/components/LoadingSpinner';

const Loading = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
