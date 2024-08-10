import { useState } from 'react';

const useInput = () => {
  const [name, setName] = useState<string | undefined>('');
  const [isNameBottomOpen, setIsNameBottomOpen] = useState<boolean>(false);
  const [state, setState] = useState<string | undefined>('');
  const [isStatusBottomOpen, setIsStatusBottomOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>('');
  const [isEmailBottomOpen, setIsEmailBottomOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | undefined>('');
  const [isPhoneBottomOpen, setIsPhoneBottomOpen] = useState<boolean>(false);

  const handleNameClick = (value: string | undefined) => {
    setName(value);
    setIsNameBottomOpen((prev) => !prev);
  };

  const handleStatusClick = (value: string | undefined) => {
    setState(value);
    setIsStatusBottomOpen((prev) => !prev);
  };
  const handleEmailClick = (value: string | undefined) => {
    setEmail(value);
    setIsEmailBottomOpen((prev) => !prev);
  };
  const handlePhoneClick = (value: string | undefined) => {
    setPhone(value);
    setIsPhoneBottomOpen((prev) => !prev);
  };

  const editInputs = [
    {
      label: '이름',
      value: name,
      isOpen: isNameBottomOpen,
      onClick: handleNameClick
    },
    {
      label: '활동상태',
      value: state,
      isOpen: isStatusBottomOpen,
      onClick: handleStatusClick
    },
    {
      label: '이메일',
      value: email,
      isOpen: isEmailBottomOpen,
      onClick: handleEmailClick
    },
    {
      label: '전화번호',
      value: phone,
      isOpen: isPhoneBottomOpen,
      onClick: handlePhoneClick
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
