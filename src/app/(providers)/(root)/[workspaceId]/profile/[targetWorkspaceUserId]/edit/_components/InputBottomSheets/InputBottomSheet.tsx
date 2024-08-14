import Button from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import StatusCheckBox from '../StatusCheckBox';

interface InputBottomSheetsProps {
  editInput: {
    label: string;
    value: string | undefined;
    isOpen: boolean;
    handleFn: (value: string | undefined) => void;
  };
}

const InputBottomSheet = ({ editInput }: InputBottomSheetsProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>(editInput.value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };

  return (
    <>
      <div className="mt-[12px] mb-[20px]">
        <StatusCheckBox status={inputValue} onChange={handleInputChange} />
      </div>
      <Button theme="primary" isFullWidth className="mb-[16px]" onClick={() => editInput.handleFn(inputValue)}>
        확인
      </Button>
    </>
  );
};

export default InputBottomSheet;
