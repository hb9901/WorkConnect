'use client';

import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEmailVerify } from '../../verify/_hooks/useEmailVerify';
import { useMutation } from '@tanstack/react-query';

type AgreeBottomSheetProps = {
  isOpen: boolean;
  handleToggleBottomSheet: () => void;
  email: string;
};

const AgreeBottomSheet = ({ isOpen, handleToggleBottomSheet, email }: AgreeBottomSheetProps) => {
  const [isAll, setIsAll] = useState<boolean>(false);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const router = useRouter();
  const { generateVerifyCode } = useEmailVerify();

  const handleCheckedAllNext = () => {
    setIsAll((prev) => !prev);
    setChecked1(!isAll);
    setChecked2(!isAll);
    setChecked3(!isAll);
  };

  const onSubmit = useMutation({
    mutationFn: async (email: string) => {
      await generateVerifyCode(email);
      router.replace(`/auth/signup/verify?email=${encodeURIComponent(email)}`);
    }
  });

  const { mutateAsync: onSubmitMutation, isPending: onSubmitPending } = onSubmit;

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={handleToggleBottomSheet} className="z-50 lg:hidden">
        <div className="flex flex-col mt-3 mb-5 mx-[18px] gap-5">
          <Typography variant="Title18px" color="grey900">
            이용약관 및 개인정보처리방침
          </Typography>
          <div className="flex flex-col gap-[17px]">
            <Typography as="strong" className="flex items-center" variant="Subtitle16px" color="grey900">
              <CheckBox theme="primary" onClick={handleCheckedAllNext} isChecked={checked1 && checked2 && checked3}>
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
        <Button
          onClick={() => onSubmitMutation(email)}
          isDisabled={!checked1 || !checked2 || onSubmitPending}
          theme="primary"
          isFullWidth={true}
        >
          다음
        </Button>
      </BottomSheet>
      <div className="hidden lg:flex">
        <Modal isOpen={isOpen} isModal={false} onClose={handleToggleBottomSheet}>
          <div className="flex flex-col my-[42px] mx-[36px] gap-5 w-[581px]">
            <Typography variant="Title20px" color="grey900">
              이용약관 및 개인정보처리방침
            </Typography>
            <div className="flex flex-col gap-[17px]">
              <Typography as="strong" className="flex items-center mb-[7px] " variant="Subtitle18px" color="grey900">
                <CheckBox theme="primary" onClick={handleCheckedAllNext} isChecked={checked1 && checked2 && checked3}>
                  약관 전체 동의
                </CheckBox>
              </Typography>

              <Typography as="p" className="flex items-center" variant="Subtitle16px" color="grey900">
                <CheckBox theme="primary" onClick={() => setChecked1((prev) => !prev)} isChecked={checked1}>
                  (필수) 이용약관 및 유의사항
                </CheckBox>
                <button className="underline ml-auto">보기</button>
              </Typography>

              <Typography as="p" className="flex items-center" variant="Subtitle16px" color="grey900">
                <CheckBox theme="primary" onClick={() => setChecked2((prev) => !prev)} isChecked={checked2}>
                  (필수) 개인정보 수집 및 이용 동의
                </CheckBox>
                <button className="underline ml-auto">보기</button>
              </Typography>

              <Typography as="p" className="flex items-center" variant="Subtitle16px" color="grey900">
                <CheckBox theme="primary" onClick={() => setChecked3((prev) => !prev)} isChecked={checked3}>
                  (선택) E-mail 및 SNS 광고성 정보 수신 동의
                </CheckBox>
              </Typography>
            </div>

            <Button
              onClick={() => onSubmitMutation(email)}
              isDisabled={!checked1 || !checked2 || onSubmitPending}
              theme="primary"
              isFullWidth={true}
            >
              {onSubmitPending ? '발송 중...' : '다음'}
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AgreeBottomSheet;
