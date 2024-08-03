import BottomLineTextFieldCount from '@/components/BottomLineTextFieldCount';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import StatusCheckBox from '../StatusCheckBox';

interface InputBottomSheetsProps {
  editInput: {
    label: string;
    value: string | undefined;
    isOpen: boolean;
    onClick: (value: string | undefined) => void;
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
      <BottomSheet key={editInput.label} isOpen={editInput.isOpen} onClose={() => editInput.onClick(editInput.value)}>
        <div className="mt-[12px] mb-[20px]">
          {editInput.label === '활동상태' ? (
            <StatusCheckBox status={editInput.value} onChange={handleInputChange} />
          ) : (
            <BottomLineTextFieldCount
              label={editInput.label}
              LabelColor="grey700Black"
              defaultValue={editInput.value}
              onChange={handleInputChange}
            />
          )}
        </div>
        <Button theme="primary" isFullWidth className="mb-[16px]" onClick={() => editInput.onClick(inputValue)}>
          확인
        </Button>
      </BottomSheet>
    </>
  );
};

export default InputBottomSheet;
