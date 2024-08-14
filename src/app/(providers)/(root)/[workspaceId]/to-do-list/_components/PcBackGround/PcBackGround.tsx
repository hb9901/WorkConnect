const PcBackGround = () => {
  return (
    <>
      <div className="lg:absolute lg:top-[84px] lg:bottom-0 lg:left-0 lg:right-[calc(100%-384px)] lg:bg-[#F4F4F6] lg:-z-[1]" />
      <div className="hidden lg:absolute lg:inline-grid lg:grid-cols-3 lg:gap-[12px] lg:bottom-[30px] lg:left-[400px] lg:top-[108px] lg:right-[17px] lg:rounded-[6px] lg:-z-[1]">
        <div className="lg:bg-[#FAFAFF] lg:-z-[1]" />
        <div className="lg:bg-[#EBECFE] lg:-z-[1]" />
        <div className="lg:bg-[#F7F7F7] lg:-z-[1]" />
      </div>
    </>
  );
};

export default PcBackGround;
