import { userStatusList } from '@/assets/userStatusList';
import Typography from '@/components/Typography';
import CheckIcon from '@/icons/Check.svg';
import { ChangeEvent } from 'react';

interface StatusCheckBoxProps {
  status: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StatusCheckBox = ({ status, onChange }: StatusCheckBoxProps) => {
  return (
    <div className="flex flex-col mx-[18px] ">
      <Typography variant="Title18px" color="grey700Black" className="mb-[24px]">
        활동상태
      </Typography>
      {userStatusList.map((userStatus) => (
        <label key={userStatus} className="flex flex-row justify-between py-[15px]">
          <Typography variant="Subtitle16px" color="grey700Black">
            {userStatus}
          </Typography>
          <div>{status === userStatus && <CheckIcon className="w-[16px] h-[16px] stroke-[#7173FA]" />}</div>
          <input
            className="hidden"
            type="checkbox"
            checked={status === userStatus}
            value={userStatus}
            onChange={onChange}
          />
        </label>
      ))}
    </div>
  );
};

export default StatusCheckBox;
