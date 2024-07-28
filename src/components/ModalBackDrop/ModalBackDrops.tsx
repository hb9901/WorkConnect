import useTimeModalStore from '@/store/timeModalStore';

function ModalBackDrop({ children }: React.PropsWithChildren) {
  const { setTimeModalClose } = useTimeModalStore();

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setTimeModalClose();
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
      onClick={handleBackDropClick}
    >
      {children}
    </div>
  );
}

export default ModalBackDrop;
