const Loading = () => {
  return (
    <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 z-[-1] bg-transparent p-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-1 transition delay-0 duration-300 ease-in"></div>
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-2 transition delay-450 duration-300 ease-in"></div>
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-3 transition delay-1000 duration-300 ease-in"></div>
      </div>
    </div>
  );
};

export default Loading;
