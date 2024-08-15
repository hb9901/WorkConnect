import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import { useState } from 'react';

const useInput = () => {
  const [name, setName] = useState<string | undefined>('');
  const [state, setState] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const setOpen = useBottomsheetModalBackDropStore((state) => state.setOpen);

  const handleNameChange = (value: string | undefined) => {
    setName(value);
  };

  const handleStateChange = (value: string | undefined) => {
    setState(value);
    setOpen();
  };

  const handleEmailChange = (value: string | undefined) => {
    setEmail(value);
  };
  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
  };

  const editInputs = [
    {
      label: '이름',
      value: name,
      handleFn: handleNameChange
    },
    {
      label: '활동상태',
      value: state,
      handleFn: handleStateChange
    },
    {
      label: '이메일',
      value: email,
      handleFn: handleEmailChange
    },
    {
      label: '전화번호',
      value: phone,
      handleFn: handlePhoneChange
    }
  ];

  return {
    editInputs,
    name,
    state,
    email,
    phone,
    setName,
    setState,
    setEmail,
    setPhone
  };
};

export default useInput;
