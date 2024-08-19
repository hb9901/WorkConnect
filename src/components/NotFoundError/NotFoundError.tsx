import NotFound from '../NotFound/NotFound';

const NotFoundError = () => {
  return (
    <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-white z-50  h-full">
      <NotFound />
    </div>
  );
};

export default NotFoundError;
