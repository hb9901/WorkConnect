'use client';

import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Typography from '@/components/Typography';
import { useState } from 'react';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const handleCheckedAllNext = () => {
    setIsAll((prev) => !prev);
    setChecked1(!isAll);
    setChecked2(!isAll);
    setChecked3(!isAll);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>바텀시트 오픈</button>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} className="z-50">
        <div className="flex flex-col mt-3 mb-5 mx-[18px] gap-5">
          <Typography variant="Title18px" color="grey900">
            이용약관 및 개인정보처리방침
          </Typography>
          <div className="flex flex-col gap-[17px]">
            <Typography as="strong" className="flex items-center" variant="Subtitle16px" color="grey900">
              <CheckBox theme="primary" onClick={handleCheckedAllNext} isChecked={isAll}>
                약관 전체 동의
              </CheckBox>
            </Typography>

            <Typography as="p" className="flex items-center" variant="Subtitle14px" color="grey900">
              <CheckBox theme="primary" onClick={() => setChecked1((prev) => !prev)} isChecked={checked1}>
                (필수) 이용약관 및 유의사항
              </CheckBox>
              <button className="underline ml-auto">보기</button>
            </Typography>

            <Typography as="p" className="flex items-center" variant="Subtitle14px" color="grey900">
              <CheckBox theme="primary" onClick={() => setChecked2((prev) => !prev)} isChecked={checked2}>
                (필수) 개인정보 수집 및 이용 동의
              </CheckBox>
              <button className="underline ml-auto">보기</button>
            </Typography>

            <Typography as="p" className="flex items-center" variant="Subtitle14px" color="grey900">
              <CheckBox theme="primary" onClick={() => setChecked3((prev) => !prev)} isChecked={checked3}>
                (선택) E-mail 및 SNS 광고성 정보 수신 동의
              </CheckBox>
            </Typography>
          </div>
        </div>
        <Button theme="primary" isFullWidth={true}>
          다음
        </Button>
      </BottomSheet>
    </div>
  );
};

export default TestPage;
