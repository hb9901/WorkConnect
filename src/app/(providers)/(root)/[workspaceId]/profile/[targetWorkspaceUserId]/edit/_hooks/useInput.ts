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

  const handleNameChange = (value: string | undefined) => {
    setName(value);
  };

  const handleStateChange = (value: string | undefined) => {
    setState(value);
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
      isOpen: isNameBottomOpen,
      onChange: handleNameChange
    },
    {
      label: '활동상태',
      value: state,
      isOpen: isStatusBottomOpen,
      onChange: handleStateChange
    },
    {
      label: '이메일',
      value: email,
      isOpen: isEmailBottomOpen,
      onChange: handleEmailChange
    },
    {
      label: '전화번호',
      value: phone,
      isOpen: isPhoneBottomOpen,
      onChange: handlePhoneChange
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
