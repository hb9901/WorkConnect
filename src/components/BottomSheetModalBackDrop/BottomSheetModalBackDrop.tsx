import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';

const BottomSheetModalBackDrop = () => {
  const setClose = useBottomsheetModalBackDropStore((state) => state.setClose);
  return <div className="absolute inset-0 bg-black opacity-40 lg:opacity-0 z-[49]" onClick={setClose} />;
};

export default BottomSheetModalBackDrop;
