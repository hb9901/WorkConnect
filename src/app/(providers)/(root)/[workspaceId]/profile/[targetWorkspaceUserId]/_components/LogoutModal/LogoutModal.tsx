'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

import useUserStore from '@/store/userStore';
import { deleteAllCookies } from '@/utils/cookie/clientUtils';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  handleLogoutClick: () => void;
}

const LogoutModal = ({ isOpen, handleLogoutClick }: LogoutModalProps) => {
  const route = useRouter();
  const { clearStore } = useUserStore((state) => state);

  const logout = async () => {
    await supabase.auth.signOut();
    clearStore();
    deleteAllCookies();
    route.push('/');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleLogoutClick} isModal={false}>
      <div className="flex flex-col justify-center w-[335px] py-[10px] lg:w-[538px] lg:py-[42px]">
        {/*모바일*/}
        <div className="mt-[20px] mb-[10px] text-center lg:hidden">정말 로그아웃 하시겠어요?</div>
        {/*PC*/}
        <div className="hidden lg:flex flex-col items-center">
          <Typography
            variant="Title18px"
            color="error"
            className="flex items-center justify-center size-[41px] rounded-full bg-[#FFE4E1] mb-[22px]"
          >
            !
          </Typography>
          <Typography variant="Title18px" color="grey700Black" className="mb-[12px]">
            정말 로그아웃 하시겠어요?
          </Typography>
          <Typography variant="Subtitle14px" color="grey400" className="mb-[13px]">
            언제든지 다시 로그인하실 수 있어요.
          </Typography>
        </div>
        {/*버튼*/}
        <div className="flex flex-row px-[16px] gap-[8px] mt-[10px] mb-[20px] lg:mb-0 lg:items-center justify-center">
          <Button theme="grey" isFullWidth onClick={handleLogoutClick} className="lg:!w-[138px]">
            다음에
          </Button>
          <Button theme="primary" isFullWidth onClick={logout} className="lg:!w-[138px] !bg-error">
            로그아웃
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
