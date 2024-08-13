import LoadingSpinner from '@/components/LoadingSpinner';

const loading = () => {
  return (
    <div className="flex items-center justify-center my-auto min-h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
