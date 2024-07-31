import LoaderIcon from '@/icons/Loader.svg';

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

export default Loading;
