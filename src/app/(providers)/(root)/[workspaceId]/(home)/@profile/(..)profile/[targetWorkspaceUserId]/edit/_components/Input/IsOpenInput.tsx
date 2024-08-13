import Toggle from '@/components/Toggle';
import Typography from '@/components/Typography';

type InputProps = {
  isOpen: boolean;
  handleIsOpenClick: () => void;
};

const IsOpenInput = ({ isOpen, handleIsOpenClick }: InputProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <Typography variant="Body14px" color="grey400">
        내 정보
      </Typography>
      <div className="flex flex-row w-full justify-between items-center">
        <Typography variant="Subtitle16px" color="grey700Black">
          공개
        </Typography>
        <Toggle isChecked={isOpen} onChange={handleIsOpenClick} />
      </div>
    </div>
  );
};

export default IsOpenInput;
