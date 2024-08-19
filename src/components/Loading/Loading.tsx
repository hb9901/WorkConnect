const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-transparent p-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-1 transition delay-0 duration-300 ease-in"></div>
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-2 transition delay-450 duration-300 ease-in"></div>
        <div className="w-4 h-4 rounded-full bg-primary200Main animate-bounce-3 transition delay-1000 duration-300 ease-in"></div>
      </div>
    </div>
  );
};

export default Loading;
